import express from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import {
    createProperty,
    getProperty,
    searchProperties,
    getSampleProperties,
    getOwnProperties,
    getFavoriteProperties,
    streamPropertyImage,
    editProperty,
    deleteProperty,
    deleteAllProperties,
} from "../controllers/property.controller";

const router = express.Router();

router.post("/new", requireAuth, createProperty);
router.get("/property/:id", getProperty);
router.get("/search", searchProperties);
router.get("/sample", getSampleProperties);
router.get("/own", requireAuth, getOwnProperties);
router.get("/favorites", requireAuth, getFavoriteProperties);
router.get("/image/:key", streamPropertyImage);
router.patch("/edit/:id", requireAuth, editProperty);
router.delete("/property/:id", requireAuth, deleteProperty);
router.delete("/all", requireAuth, deleteAllProperties);

export default router;
