import express from "express";
import { CustomRequest } from "../types/types";

const router = express.Router();

router.post("/post", (req: CustomRequest, res) => {});

export default router;
