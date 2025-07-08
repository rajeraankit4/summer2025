import Otp from "../models/otp.js";
import User from "../models/user.model.js";
import { sendOtpVerificationEmail } from "../middleware/nodemailer.js";

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const otp = generateOtp();
    await sendOtpVerificationEmail(email, otp);
    await Otp.create({ email, otp });

    console.log(`OTP ${otp} sent to ${email}`);
    res.status(200).json({ message: "Verification code sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ error: "Failed to send verification code", details: err.message });
  }
};

export const verifySignupOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

  try {
    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) return res.status(400).json({ error: "Invalid OTP" });

    const now = new Date();
    const created = new Date(otpEntry.createdAt);
    const minutesDiff = (now - created) / 1000 / 60;

    if (minutesDiff > 10) {
      await Otp.deleteMany({ email }); // Clean up expired
      return res.status(400).json({ error: "OTP expired" });
    }

    await Otp.deleteMany({ email }); // Clean up after success

    res.status(200).json({
      success: true,
      message: "OTP verified. Proceed to complete signup.",
      data: {
        email,
        verified: true,
        nextStep: "signupForm"
      }
    });
  } catch (err) {
    res.status(500).json({ error: "OTP verification failed", details: err.message });
  }
};

export const resendVerificationCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    await Otp.deleteMany({ email });

    const otp = generateOtp();
    await sendOtpVerificationEmail(email, otp);
    await Otp.create({ email, otp });

    res.status(200).json({ message: "Verification code resent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to resend verification code", details: err.message });
  }
};
