import dotenv from "dotenv";

dotenv.config();

const env = {
    // general
    PORT: +(process.env.PORT || process.env.port || "3000"),
    SECRET: process.env.SECRET!,
    CLIENT_URL: process.env.CLIENT_URL!,

    // database
    DB_URI: process.env.DB_URI!,
    DB_NAME: process.env.DB_NAME!,

    // email
    EMAIL_USER: process.env.EMAIL_USER!,
    EMAIL_APP_PASS: process.env.EMAIL_APP_PASS!,

    // s3
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME!,
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION!,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY!,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY!,
};

export default env;
