import express from "express";
import bcrypt from "bcrypt";
import { CustomRequest } from "../types/types";
import Property from "../models/property.model";
import User from "../models/user.model";
import { s3_delete } from "../utils/s3";
import { requireAuth } from "../middlewares/auth.middleware";

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

router.patch(
    "/update/:type(email|username|password)",
    requireAuth,
    async (req: CustomRequest, res) => {
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

            // update field
            req.user[req.params.type] = req.body[req.params.type];
            await req.user.save();

            // return response
            res.status(200).json({
                [req.params.type]: req.user[req.params.type],
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

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

        // delete images from s3
        const images = properties.map((property) => property.images).flat();
        await s3_delete(images);

        // return response
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
