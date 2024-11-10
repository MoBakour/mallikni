import multer from "multer";
import fs from "fs";

// multer upload setup
export const upload = multer({
    dest: "uploads/",
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
