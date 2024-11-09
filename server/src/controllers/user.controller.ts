import express from "express";
import { CustomRequest } from "../types/types";

const router = express.Router();

router.get("/register", (req: CustomRequest, res) => {});

export default router;
