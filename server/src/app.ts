// envrionment variables
import dotenv from "dotenv";
dotenv.config();

// dependencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// middlewares and controllers
import { authenticate } from "./middlewares/auth.middleware";
import authController from "./controllers/auth.controller";
import userController from "./controllers/user.controller";
import propertyController from "./controllers/property.controller";

// create and configure server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.CLIENT_URL,
    })
);

const PORT = +(process.env.PORT || process.env.port || "3000");

// connect to database and start server
mongoose
    .connect(process.env.DB_URI!, {
        dbName: process.env.DB_NAME,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error(err));

// middlewares
app.use(authenticate);

// controllers
app.use("/auth", authController);
app.use("/users", userController);
app.use("/properties", propertyController);

// 404
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
    });
});
