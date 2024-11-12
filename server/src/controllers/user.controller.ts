import express from "express";
import bcrypt from "bcrypt";
import { CustomRequest } from "../types/types";
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

const router = express.Router();

router.patch("/favor", async (req: CustomRequest, res) => {
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

router.patch("/update", requireAuth, async (req: CustomRequest, res) => {
    uploadUserAvatar(req, res, async (err) => {
        const cont = handleMulterErrors(res, err);
        if (!cont) return;

        try {
            // check password
            // const validPassword = await bcrypt.compare(
            //     req.body.confirmationPassword,
            //     req.user.password
            // );

            // if (!validPassword) {
            //     res.status(400).json({ error: "Incorrect password" });
            //     return;
            // }

            // validate fields
            if (req.body.password === "") {
                delete req.body.password;
            }
            const data = updateUserSchema.partial().parse(req.body);

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

            // update fields
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                    ...data,
                    avatar: req.file ? req.file.originalname : req.user.avatar,
                },
                { new: true, projection: { password: 0 } }
            );

            if (!updatedUser) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            // return response
            res.status(200).json({
                user: {
                    ...updatedUser.toObject(),
                    activation: {
                        activated: true,
                    },
                },
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        } finally {
            if (req.file) {
                await deleteFiles(req.file.path);
            }
        }
    });
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

router.delete("/delete", async (req: CustomRequest, res) => {
    try {
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
        await s3_delete([...images, req.user.avatar]);

        // return response
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
