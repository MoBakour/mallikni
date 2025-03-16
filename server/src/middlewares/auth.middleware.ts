import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

export const authenticate: RequestHandler = (req, res, next) => {
    try {
        // get header
        const header = req.header("Authorization");
        if (!header) {
            next();
            return;
        }

        // get token
        const [bearer, token] = header.split(" ");
        if (!token || !bearer || bearer !== "Bearer") {
            next();
            return;
        }

        // verify token
        jwt.verify(token, process.env.SECRET!, async (err, decoded) => {
            if (!err && decoded) {
                const userId = (decoded as JwtPayload).userId;
                const user = await User.findById(userId);
                req.user = user;
            }

            next();
        });
    } catch (err: any) {
        console.error(err);
        res.status(401).json({
            error: err.message,
        });
        return;
    }
};

export const createToken = (userId: string) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { userId },
            process.env.SECRET!,
            (err: any, token: string | undefined) => {
                if (!err) {
                    resolve(token);
                } else {
                    reject(err);
                }
            }
        );
    });
};

export const requireAuth: RequestHandler = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            error: "Unauthorized",
        });
        return;
    }

    next();
};
