import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  sendVerificationCode,
  verifySignupOtp,
  resendVerificationCode,
  login,
  signup,
  getMe
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup",signup);

router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-code", verifySignupOtp);
router.post("/resend-code", resendVerificationCode);

// Get logged-in user's details
router.get("/users/me", verifyToken, getMe);

export default router;
