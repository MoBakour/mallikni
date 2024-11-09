import express from "express";
import { ZodError } from "zod";
import { CustomRequest } from "../types/types";
import { userSchema } from "../utils/validation";
import User from "../models/user.model";
import { sendActivationEmail } from "../utils/mailer";
import { generateActivationCode } from "../utils/utils";
import { createToken } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", async (req: CustomRequest, res) => {
    try {
        // validate user data
        const { email, username, password } = userSchema.parse(req.body);

        const user = {
            email,
            username,
            password,
        };

        // save user to database
        const userDocument = await User.create(user);

        // send activation email
        const activationCode = generateActivationCode();
        // sendActivationEmail(email, activationCode);

        // generate jwt token
        const token = await createToken(userDocument._id.toString());

        res.status(200).json({
            user: {
                ...userDocument.toObject(),
                password: undefined,
                activation: {
                    activated: true,
                },
            },
            token,
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
    }
});

export default router;
