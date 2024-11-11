import multer, { MulterError, diskStorage } from "multer";
import fs from "fs";
import { Response } from "express";

// multer upload setup
const storage = diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Files can only be images"));
        }

        cb(null, true);
    },
}).array("images", 30);

// handle multer errors
export const handleMulterErrors = (res: Response, err: Error) => {
    if (err instanceof MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
        res.status(400).json({
            error: "You can upload a maximum of 30 images",
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
        if (typeof file === "string") {
            await fs.promises.unlink(file);
        } else if (Array.isArray(file)) {
            for (const f of file) {
                await fs.promises.unlink(f);
            }
        }
    } catch (err) {
        console.error(err);
    }
};
