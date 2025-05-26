import mongoose from "mongoose";
import env from "./env";

export const connectDB = async () => {
    try {
        await mongoose.connect(env.DB_URI, {
            dbName: env.DB_NAME,
        });
        console.log("Connected to database");
    } catch (err) {
        console.error("Error connecting to database", err);
        process.exit(1);
    }
};
