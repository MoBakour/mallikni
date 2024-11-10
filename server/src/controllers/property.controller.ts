import express from "express";
import { MulterError } from "multer";
import { CustomRequest } from "../types/types";
import { deleteFiles, upload } from "../middlewares/multer.middleware";
import Property from "../models/property.model";
import { propertySchema } from "../utils/validation";
import { s3_get, s3_post } from "../utils/s3";
import { ZodError } from "zod";
import User from "../models/user.model";

const router = express.Router();

router.post("/new", (req: CustomRequest, res) => {
    // use multer
    upload(req, res, async (err) => {
        // handle errors
        if (
            err instanceof MulterError &&
            err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
            res.status(400).json({
                error: "You can upload a maximum of 30 images",
                code: "IMAGE",
            });
            return;
        } else if (
            err instanceof MulterError &&
            err.code === "LIMIT_FILE_SIZE"
        ) {
            res.status(400).json({
                error: "Size of each image must not exceed 5 MB",
                code: "IMAGE",
            });
            return;
        } else if (err) {
            console.error(err);
            res.status(400).json({
                error: err.message,
            });
            return;
        }

        try {
            const requestBody = JSON.parse(req.body.data);
            const data = {
                ...requestBody,
                owner: req.user._id,
            };

            // validate data
            propertySchema.parse(data);

            // store images in s3
            let keys: string[] = [];
            if (req.files && Array.isArray(req.files)) {
                keys = await Promise.all(
                    req.files.map((file: Express.Multer.File) => s3_post(file))
                );
            }

            // store in db
            const property = await Property.create({
                ...data,
                images: keys,
            });

            // send response
            res.status(200).json({
                property,
            });
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({
                    error: err.errors[0].message,
                });
            } else {
                console.error(err);
                res.status(500).json({
                    error: "Internal server error",
                });
            }
        } finally {
            if (req.files && Array.isArray(req.files)) {
                await deleteFiles(req.files.map((file) => file.path));
            }
        }
    });
});

router.get("/property/:id", async (req, res) => {
    try {
        // get property by id
        const property = await Property.findById(req.params.id).populate(
            "owner"
        );

        if (!property) {
            res.status(404).json({
                error: "Property not found",
            });
            return;
        }

        // return response
        res.status(200).json({
            property,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/sample", async (req, res) => {
    try {
        // get sample properties
        const properties = await Property.aggregate([
            { $sample: { size: 10 } },
        ]);

        // return response
        res.status(200).json({
            properties,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/own", async (req: CustomRequest, res) => {
    try {
        // find properties owned by user
        const properties = await Property.find({ owner: req.user._id });

        // return response
        res.status(200).json({
            properties,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/favorites", async (req: CustomRequest, res) => {
    try {
        // get user favorite properties
        const properties = await Property.find({
            _id: { $in: req.user.favorites },
        });

        // return response
        res.status(200).json({
            properties,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.delete("/delete/:id", async (req: CustomRequest, res) => {
    try {
        // delete property
        const deletedProperty = await Property.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!deletedProperty) {
            res.status(404).json({
                error: "Property not found",
            });
            return;
        }

        // remove property from users favorites
        await User.updateMany(
            {
                favorites: req.params.id,
            },
            {
                $pull: { favorites: req.params.id },
            }
        );

        // return response
        res.status(200).json({
            message: "Property deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/image/:key", async (req, res) => {
    try {
        // get image from s3 and stream it to user
        const stream = (await s3_get(req.params.key)) as NodeJS.ReadableStream;
        stream.pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

export default router;
