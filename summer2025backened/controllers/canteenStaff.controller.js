import CanteenStaff from "../models/canteenStaff.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import generateToken from "../utils/generateToken.js";
// 🟢 STEP 1: Import the new, reliable password generator
import { generateSecurePassword } from "../utils/password.js";
dotenv.config();
// ✅ Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

// ✅ Password verification controller
export const verifyCanteenStaffPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // 🟢 STEP 2: FIX - Use a case-insensitive regex to find the user.
    // This ensures "User@email.com" matches "user@email.com".
    const user = await CanteenStaff.findOne({
      email: { $regex: new RegExp(`^${email.trim()}$`, "i") },
    });

    if (!user) {
      // This error is now less likely to occur due to the fix above.
      return res.status(404).json({ error: "Staff not found" });
    }
    // Compare the password submitted by the user with the hash in the database.
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      generateToken(res, user._id, user.email, user.role || 'canteenadmin');
      return res.status(200).json({ success: true, message: "Password matched" ,
        _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role || 'canteenadmin'
      });
    } else {
      return res.status(401).json({ success: false, message: "Password does not match" });
    }
  } catch (err) {
    console.error("Password verification error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};
 //login route controller
export const loginCanteenStaff = async (req, res) => {
  const { name, mobile, email } = req.body;

  if (!name || !mobile || !email) {
    return res.status(400).json({ error: "Name, mobile, and email are required" });
  }

  try {
    // 🟢 STEP 2: Use a case-insensitive regex to find the user.
    const user = await CanteenStaff.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      mobile,
      email: { $regex: new RegExp(`^${email.trim()}$`, "i") },
    });

    if (!user) {
      return res.status(400).json({ error: "Staff does not exist" });
    }

    // 🟢 STEP 3: Use the reliable generator to create a safe password.
    const plainPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Send the safe password via email.
    await transporter.sendMail({
      from: process.env.GOOGLE_APP_EMAIL,
      to: email,
      subject: "Canteen Staff Login Credentials",
      text: `Your login credentials:\nEmail: ${email}\nPassword: ${plainPassword}`,
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Error logging in canteen staff:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// ✅ Canteen staff creation controller
export const getCanteenStaff = async (req, res) => {
  try {
    const staff = await CanteenStaff.find({}, "-password");
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: "Error fetching canteen staff", details: err.message });
  }
};

export const updateCanteenStaff = async (req, res) => {
  const staffList = req.body;
  if (!Array.isArray(staffList) || staffList.length === 0) {
    return res.status(400).json({ error: "Invalid staff list" });
  }

  try {
      const formattedStaff = staffList.map(staff => {
      if (!staff.name || !staff.mobile || !staff.email || !staff.date) {
        throw new Error("Each staff member must have name, mobile, email, and date");
      }
      return {
        name: staff.name,
        mobile: staff.mobile,
        email: staff.email,
        date: new Date(staff.date), // ensure correct format
        password: "NEEDS_RESET",
      };
    });
    await CanteenStaff.deleteMany({});
    await CanteenStaff.insertMany(formattedStaff);
    res.status(200).json({ message: "Canteen staff updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating canteen staff", details: err.message });
  }
};

export const transactionStats = async (req, res) => {
  try {
    const stats = await CanteenStaff.aggregate([
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(stats[0] || { totalCount: 0 });
  } catch (err) {
    res.status(500).json({ error: "Error fetching transaction stats", details: err.message });
  }
};