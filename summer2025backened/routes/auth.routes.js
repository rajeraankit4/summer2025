import express from "express";
import {
  sendVerificationCode,
  verifySignupOtp,
  resendVerificationCode,
  login,
  signup
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup",signup);

router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-code", verifySignupOtp);
router.post("/resend-code", resendVerificationCode);

export default router;
