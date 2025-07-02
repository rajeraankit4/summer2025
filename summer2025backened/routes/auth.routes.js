import express from "express";
import {
  sendVerificationCode,
  verifyCode,
  completeSignup,
  loginUser,
} from "../controllers/auth.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-code", verifyCode);
router.post("/complete-signup", upload.array("documents"), completeSignup);
router.post("/login", loginUser);

export default router;