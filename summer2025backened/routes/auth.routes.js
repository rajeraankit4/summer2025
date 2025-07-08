import express from "express";
import {
  sendVerificationCode,
  verifySignupOtp,
  resendVerificationCode
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-code", verifySignupOtp);
router.post("/resend-code", resendVerificationCode);

export default router;
