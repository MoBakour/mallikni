import express from "express";
import bcrypt from "bcrypt";
import {
    deleteFiles,
    handleMulterErrors,
    uploadPropertyImages,
} from "../middlewares/multer.middleware";
import Property from "../models/property.model";
import { propertySchema } from "../utils/validation";
import { s3_delete, s3_get, s3_post } from "../utils/s3";
import { ZodError } from "zod";
import User from "../models/user.model";
import { translateQueryToMQL } from "../utils/utils";
import { requireAuth } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/new", requireAuth, (req, res) => {
    // use multer
    uploadPropertyImages(req, res, async (err) => {
        // handle errors
        const cont = handleMulterErrors(res, err);
        if (!cont) return;

        try {
            const requestBody = JSON.parse(req.body.data);
            const data = {
                ...requestBody,
                owner: req.user._id,
            };

            // validate data
            propertySchema.parse(data);

            // store images in s3
            if (req.files && Array.isArray(req.files)) {
                await Promise.all(
                    req.files.map((file: Express.Multer.File) => s3_post(file))
                );
            }

            // store in db
            const property = await Property.create({
                ...data,
                images:
                    req.files && Array.isArray(req.files)
                        ? req.files.map(
                              (file: Express.Multer.File) => file.originalname
                          )
                        : [],
            });

            // send response
            res.status(200).json({
                propertyId: property._id,
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
            "owner",
            "-password"
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

router.get("/search", async (req, res) => {
    try {
        const query = req.query;

        // build query
        const filter = translateQueryToMQL(query);

        // perform search
        const properties = await Property.find(filter);

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

router.get("/own", requireAuth, async (req, res) => {
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

router.get("/favorites", requireAuth, async (req, res) => {
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

router.put("/edit/:id", requireAuth, (req, res) => {
    uploadPropertyImages(req, res, async (err) => {
        // handle errors
        const cont = handleMulterErrors(res, err);
        if (!cont) return;

        try {
            // validate body
            const data = JSON.parse(req.body.data);
            propertySchema.parse(data);

            // get property
            const property = await Property.findById(req.params.id);

            if (!property) {
                res.status(404).json({
                    error: "Property not found",
                });
                return;
            }

            // find removed images and delete from s3 & db
            const removedImages = property.images.filter(
                (image) => !data.images.some((img: any) => img.file === image)
            );
            await s3_delete(removedImages);
            property.images = property.images.filter(
                (img: string) => !removedImages.includes(img)
            );

            // store new images in s3
            let newImages: string[] = [];
            if (req.files && Array.isArray(req.files)) {
                await Promise.all(
                    req.files.map((file: Express.Multer.File) => s3_post(file))
                );

                // find new images
                newImages = req.files
                    .filter(
                        (file: any) =>
                            !property.images.includes(file.originalname)
                    )
                    .map((file: any) => file.originalname);

                data.images = data.images.map((img: any) => {
                    if (img.type === "new") {
                        img.file = newImages.shift();
                    }

                    return img.file;
                });
            }

            // store changes in db
            Object.assign(property, data);
            await property.save();

            // return response
            res.status(200).json({
                propertyId: property._id,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal server error",
            });
        } finally {
            if (req.files && Array.isArray(req.files)) {
                await deleteFiles(req.files.map((file) => file.path));
            }
        }
    });
});

router.delete("/property/:id", requireAuth, async (req, res) => {
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

        // delete images from s3
        await s3_delete(deletedProperty.images);

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

router.delete("/all", requireAuth, async (req, res) => {
    try {
        // check password
        const validPassword = await bcrypt.compare(
            req.body.confirmationPassword,
            req.user.password
        );

        if (!validPassword) {
            res.status(400).json({
                error: "Incorrect password",
            });
            return;
        }

        // get all properties
        const properties = await Property.find({ owner: req.user._id });

        // delete all properties
        const result = await Property.deleteMany({ owner: req.user._id });

        // remove properties from users favorites
        const propertiesIds = properties.map((property) => property._id);
        await User.updateMany(
            { favorites: { $in: propertiesIds } },
            { $pull: { favorites: { $in: propertiesIds } } }
        );

        // delete images from s3
        const images = properties.map((property) => property.images).flat();
        await s3_delete(images);

        // return response
        res.status(200).json({
            message: "All properties deleted successfully",
            deletedCount: result.deletedCount,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

export default router;
