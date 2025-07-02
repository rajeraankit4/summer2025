import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// Helper to send verification email
const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification Code",
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    await sendVerificationEmail(email, verificationCode);

    const newUser = new User({ email, verificationCode });
    await newUser.save();

    res.status(200).json({ message: "Verification code sent" });
  } catch (err) {
    res.status(500).json({ error: "Error sending verification code", details: err.message });
  }
};

export const verifyCode = async (req, res) => {
  const { email, verificationCode } = req.body;
  if (!email || !verificationCode) return res.status(400).json({ error: "Email and code are required" });

  try {
    const user = await User.findOne({ email, verificationCode });
    if (!user) return res.status(400).json({ error: "Invalid verification code" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error verifying code", details: err.message });
  }
};

export const completeSignup = async (req, res) => {
  const { email, ...signupData } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashedPassword = await bcrypt.hash(signupData.password, 10);
    
    Object.assign(user, { ...signupData, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Signup completed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Signup completion error", details: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role)
    return res.status(400).json({ error: "Email, password, and role are required" });

  try {
    const user = await User.findOne({ email, role });
    if (!user || !user.isVerified)
      return res.status(401).json({ error: "Invalid email, password, or role" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid email, password, or role" });

    res.status(200).json({ success: true, message: "Login successful", user: { role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Login error", details: err.message });
  }
};
