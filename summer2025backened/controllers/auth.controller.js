import Otp from "../models/otp.js";
import User from "../models/user.model.js";
import { sendOtpVerificationEmail } from "../middleware/nodemailer.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const otp = generateOtp();
    console.log(otp);
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
  console.log("OTP verification request received:", { email, otp });
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



export const login = async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Login request received:", { email, role });

  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email, password, and role are required" });
  }

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ error: "User not verified" });
    }
    console.log(process.env.JWT_SECRET);
    const token = jsonwebtoken.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};


export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validation
    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password, and role are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user (✅ include role)
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: { email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
};