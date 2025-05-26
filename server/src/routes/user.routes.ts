import express from "express";
import {
    streamAvatar,
    toggleFavorite,
    activateUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/avatar/:key", streamAvatar);
router.patch("/favor", requireAuth, toggleFavorite);
router.patch("/activate", requireAuth, activateUser);
router.patch("/update", requireAuth, updateUser);
router.delete("/delete", requireAuth, deleteUser);

export default router;
