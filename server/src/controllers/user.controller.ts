import express from "express";
import bcrypt from "bcrypt";
import cron from "node-cron";
import Property from "../models/property.model";
import User from "../models/user.model";
import { s3_delete, s3_get, s3_post } from "../utils/s3";
import { requireAuth } from "../middlewares/auth.middleware";
import {
    deleteFiles,
    handleMulterErrors,
    uploadUserAvatar,
} from "../middlewares/multer.middleware";
import { updateUserSchema } from "../utils/validation";
import { generateActivationCode, timeUntil } from "../utils/utils";
import { sendActivationEmail } from "../utils/mailer";
import { ZodError } from "zod";

const router = express.Router();

/**
 * cron job every minute:
 *      - delete blocked users that have issued codes older than 24 hours
 *      - delete unactivated recently created users that have issued codes older than 10 minutes
 */
cron.schedule("* * * * *", async () => {
    try {
        await User.deleteMany({
            "activation.blocked": true,
            "activation.issuedAt": {
                $lte: new Date(Date.now() - 1000 * 60 * 60 * 24),
            },
        });

        await User.updateMany(
            {
                "activation.activated": false,
                "activation.blocked": false,
                "activation.updated": false,
                "activation.issuedAt": {
                    $lte: new Date(Date.now() - 1000 * 60 * 10),
                },
            },
            { $set: { "activation.blocked": true } }
        );
    } catch (err) {
        console.error(err);
    }
});

router.get("/avatar/:key", async (req, res) => {
    try {
        const stream = (await s3_get(req.params.key)) as NodeJS.ReadableStream;
        stream.pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch("/favor", requireAuth, async (req, res) => {
    try {
        const property = await Property.findById(req.body.propertyId);

        if (!property) {
            res.status(404).json({ error: "Property not found" });
            return;
        }

        const alreadyFavored = req.user.favorites.includes(req.body.propertyId);
        const updateQuery = alreadyFavored
            ? { $pull: { favorites: req.body.propertyId } }
            : { $addToSet: { favorites: req.body.propertyId } };

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateQuery,
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json({
            favored: !alreadyFavored,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.patch("/activate", requireAuth, async (req, res) => {
    try {
        // get user with activation data
        const user = await User.findById(req.user._id, {
            activation: 1,
        });

        // check if no user or if user is already activated
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        if (user.activation!.activated) {
            res.status(400).json({
                error: "You are already activated",
            });
            return;
        }

        // error messages
        const INCORRECT_CODE_ERR = "Incorrect activation code";
        const ACTIVATION_BLOCKED_ERR = `Your email got blocked from registration for ${timeUntil(
            new Date(user.activation!.issuedAt).getTime() + 1000 * 60 * 60 * 24
        )}`;

        // check if user is blocked
        if (user.activation!.blocked) {
            res.status(400).json({
                error: ACTIVATION_BLOCKED_ERR,
            });
            return;
        }

        // check if user is out of attempts
        if (user.activation!.attempts === 0 && !user.activation!.updated) {
            res.status(400).json({
                error: ACTIVATION_BLOCKED_ERR,
            });
            return;
        }

        // update attempts and activation status
        const activationSuccess = user.activation!.code === req.body.code;

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    "activation.activated": activationSuccess,
                },
                $inc: { "activation.attempts": -1 },
            },
            { new: true, projection: { password: 0 } }
        );

        // check if activation code is incorrect
        if (!activationSuccess) {
            if (user.activation?.updated) {
                res.status(400).json({
                    error: INCORRECT_CODE_ERR,
                });
                return;
            }

            const left = user.activation!.attempts - 1;
            const error =
                left === 0
                    ? ACTIVATION_BLOCKED_ERR
                    : `${INCORRECT_CODE_ERR}. You have ${left} ${
                          left === 1 ? "attempt" : "attempts"
                      } left`;

            res.status(400).json({
                error,
            });
            return;
        }

        // return success response
        res.status(200).json({
            message: "Account activated",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/update", requireAuth, async (req, res) => {
    uploadUserAvatar(req, res, async (err) => {
        const cont = handleMulterErrors(res, err);
        if (!cont) return;

        try {
            // check password
            const validPassword = await bcrypt.compare(
                req.body.confirmationPassword,
                req.user.password
            );

            if (!validPassword) {
                res.status(400).json({ error: "Incorrect password" });
                return;
            }

            // validate fields
            if (req.body.password === "") {
                delete req.body.password;
            }
            const data = updateUserSchema.parse(req.body);

            // hash password
            if (data.password) {
                const salt = await bcrypt.genSalt();
                data.password = await bcrypt.hash(data.password, salt);
            }

            // save new avatar and remove old one from s3
            if (req.file) {
                await Promise.all([
                    s3_delete(req.user.avatar),
                    s3_post(req.file),
                ]);
            }

            // generate activation code (if needed)
            const emailUpdated = req.user.email !== data.email?.toLowerCase();
            let activationCode;
            if (emailUpdated) {
                activationCode = generateActivationCode();
            }

            // update fields
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                    username: data.username || req.user.username,
                    email: data.email?.toLowerCase() || req.user.email,
                    password: data.password || req.user.password,
                    avatar: req.file ? req.file.originalname : req.user.avatar,
                    ...(!emailUpdated
                        ? {}
                        : {
                              activation: {
                                  blocked: false,
                                  activated: false,
                                  code: activationCode,
                                  attempts: 5,
                                  issuedAt: new Date(),
                                  updated: true,
                              },
                          }),
                },
                { new: true, projection: { password: 0 } }
            );

            if (!updatedUser) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            // send email with activation code
            if (emailUpdated) {
                await sendActivationEmail(
                    updatedUser.email,
                    activationCode!,
                    "update"
                );
            }

            // return response
            res.status(200).json({
                user: {
                    ...updatedUser.toObject(),
                },
            });
        } catch (err: any) {
            if (err instanceof ZodError) {
                res.status(400).json({
                    error: err.errors[0].message,
                });
                return;
            }

            if (err.code === 11000) {
                const cause = Object.keys(err.keyPattern)[0];
                res.status(400).json({
                    error: `An account with that ${cause} already exists`,
                });
                return;
            }

            console.error(err);
            res.status(500).json({
                error: "Internal server error",
            });
        } finally {
            if (req.file) {
                await deleteFiles(req.file.path);
            }
        }
    });
});

router.delete("/delete", requireAuth, async (req, res) => {
    try {
        // check password
        const validPassword = await bcrypt.compare(
            req.body.confirmationPassword,
            req.user.password
        );

        if (!validPassword) {
            res.status(400).json({ error: "Incorrect password" });
            return;
        }

        // delete user
        const user = await User.findByIdAndDelete(req.user._id);

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        // find properties
        const properties = await Property.find({ owner: req.user._id });

        // delete properties
        await Property.deleteMany({ owner: req.user._id });

        // remove properties from users favorites
        const propertyIds = properties.map((property) => property._id);
        await User.updateMany(
            { favorites: { $in: propertyIds } },
            { $pull: { favorites: { $in: propertyIds } } }
        );

        // delete associated images from s3
        const images = properties.map((property) => property.images).flat();
        if (req.user.avatar) images.push(req.user.avatar);
        await s3_delete(images);

        // return response
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
