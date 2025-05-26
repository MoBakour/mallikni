import express from "express";
import cors from "cors";

import env from "./config/env";
import { connectDB } from "./config/db";
import { authenticate } from "./middlewares/auth.middleware";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import propertyRoutes from "./routes/property.routes";

// create and configure server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: env.CLIENT_URL,
    })
);

// connect to database and start server
connectDB().then(() => {
    app.listen(env.PORT, () => {
        console.log(`Server is running on port ${env.PORT}`);
    });
});

// middlewares
app.use(authenticate);

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/properties", propertyRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
    });
});
