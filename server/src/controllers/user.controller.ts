import express from "express";
import { CustomRequest } from "../types/types";
import Property from "../models/property.model";
import User from "../models/user.model";

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

export default router;
