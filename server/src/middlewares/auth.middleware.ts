import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../types/types";
import User from "../models/user.model";

export const authenticate = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // get header
        const header = req.header("Authorization");
        if (!header) {
            next();
            return;
        }

        // get token
        const [token, bearer] = header.split(" ");
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

export const requireAuth = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }

    next();
};
