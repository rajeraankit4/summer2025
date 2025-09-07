import { verifyToken } from "../middleware/auth.js";
import express from "express";
import User from "../models/user.model.js";
import { scanAndAddExpense, refreshToken } from "../controllers/qrController.js";

const router = express.Router();

// POST /api/qr/scan
router.post("/scan", verifyToken, scanAndAddExpense);

// POST /api/qr/refresh-token 
router.post("/refresh-token", verifyToken, refreshToken);

export default router;
