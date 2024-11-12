import multer, { MulterError, diskStorage } from "multer";
import fs from "fs";
import { Response } from "express";

const MAX_IMAGE_SIZE = 1024 * 1024 * 5;
const MAX_IMAGE_COUNT = 30;

// multer upload setup
const storage = diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const uploadPropertyImages = multer({
    storage,
    limits: {
        fileSize: MAX_IMAGE_SIZE,
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Files can only be images"));
        }

        cb(null, true);
    },
}).array("images", MAX_IMAGE_COUNT);

export const uploadUserAvatar = multer({
    storage,
    limits: {
        fileSize: MAX_IMAGE_SIZE,
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("File can only be an image"));
        }

        cb(null, true);
    },
}).single("avatar");

// handle multer errors
export const handleMulterErrors = (res: Response, err: Error) => {
    if (err instanceof MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
        res.status(400).json({
            error: `You can upload a maximum of ${MAX_IMAGE_COUNT} images`,
            code: "IMAGE",
        });
        return false;
    } else if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({
            error: "Size of each image must not exceed 5 MB",
            code: "IMAGE",
        });
        return false;
    } else if (err) {
        console.error(err);
        res.status(400).json({
            error: err.message,
        });
        return false;
    }

    return true;
};

// delete files
export const deleteFiles = async (file: string | string[]) => {
    try {
        const files = Array.isArray(file) ? file : [file];
        await Promise.all(files.map((f) => fs.promises.unlink(f)));
    } catch (err) {
        console.error(err);
    }
};
