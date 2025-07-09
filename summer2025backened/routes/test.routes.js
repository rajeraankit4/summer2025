import express from "express";
import { generateReadablePassword } from "../utils/passwordGenerator.js";
import { sendLoginCredentials } from "../middleware/nodemailer.js";

const router = express.Router();

// Test endpoint to verify email functionality
router.post("/test-email", async (req, res) => {
  try {
    const { email, fullName } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({
        error: "Email and fullName are required for testing",
      });
    }

    const testPassword = generateReadablePassword(10);

    await sendLoginCredentials(email, fullName, email, testPassword);

    res.status(200).json({
      success: true,
      message: "Test email sent successfully",
      generatedPassword: testPassword,
    });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({
      error: "Failed to send test email",
      details: error.message,
    });
  }
});

// Test endpoint to generate password
router.get("/test-password", (req, res) => {
  try {
    const password = generateReadablePassword(10);
    res.status(200).json({
      success: true,
      generatedPassword: password,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate password",
      details: error.message,
    });
  }
});

export default router;
