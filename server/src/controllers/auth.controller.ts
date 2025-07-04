import { Handler } from "express";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { createUserSchema } from "../utils/validation";
import User from "../models/user.model";
import { sendActivationEmail } from "../utils/mailer";
import { createToken } from "../middlewares/auth.middleware";

export const signup: Handler = async (req, res) => {
    try {
        // validate user data
        const { email, username, password } = createUserSchema.parse(req.body);

        const user = {
            email: email.toLowerCase(),
            username,
            password,
        };

        // hash password
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);

        // save user to database
        const userDocument = await User.create(user);

        // send activation email
        sendActivationEmail(
            userDocument.email,
            userDocument.activation!.code,
            "new"
        );

        // generate jwt token
        const token = await createToken(userDocument._id.toString());

        res.status(200).json({
            user: {
                ...userDocument.toObject(),
                password: undefined,
                activation: {
                    activated: userDocument.activation!.activated,
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
};

export const login: Handler = async (req, res) => {
    try {
        // verify login data
        if (!req.body.credential) {
            res.status(400).json({
                error: "Email or username is required",
            });
            return;
        }

        if (!req.body.password) {
            res.status(400).json({
                error: "Password is required",
            });
            return;
        }

        // find user
        const user = await User.findOne({
            $or: [
                { email: req.body.credential.toLowerCase() },
                { username: req.body.credential },
            ],
        });

        if (!user) {
            res.status(404).json({
                error: "Username or email is incorrect",
            });
            return;
        }

        // check password
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            res.status(400).json({
                error: "Password is incorrect",
            });
            return;
        }

        // generate jwt token
        const token = await createToken(user._id.toString());

        res.status(200).json({
            user: {
                ...user.toObject(),
                password: undefined,
            },
            token,
        });
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json({
                error: err.errors[0].message,
            });
            return;
        }

        console.error(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};
