import fs from "fs";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import env from "../config/env";

const bucketName = env.S3_BUCKET_NAME;

const s3 = new S3Client({
    region: env.S3_BUCKET_REGION,
    credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
});

export const s3_post = async (fileObject: Express.Multer.File) => {
    const fileStream = fs.createReadStream(fileObject.path);

    const params = {
        Bucket: bucketName,
        Key: fileObject.filename,
        Body: fileStream,
        ContentType: fileObject.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    return fileObject.filename;
};

export const s3_get = async (fielKey: string) => {
    const params = {
        Bucket: bucketName,
        Key: fielKey,
    };

    const command = new GetObjectCommand(params);
    const response = await s3.send(command);

    return response.Body;
};

export const s3_delete = async (fileKey: string | string[]) => {
    if (!fileKey || fileKey.length === 0) return;

    const params = {
        Bucket: bucketName,
        Delete: {
            Objects: Array.isArray(fileKey)
                ? fileKey.map((key) => ({ Key: key }))
                : [{ Key: fileKey }],
        },
    };

    const command = new DeleteObjectsCommand(params);
    return await s3.send(command);
};
