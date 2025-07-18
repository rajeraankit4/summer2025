import MessStaff from "../models/messStaff.model.js";
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
export const verifyMessStaffPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // 🟢 STEP 2: FIX - Use a case-insensitive regex to find the user.
    // This ensures "User@email.com" matches "user@email.com".
    const user = await MessStaff.findOne({
      email: { $regex: new RegExp(`^${email.trim()}$`, "i") },
    });

    if (!user) {
      // This error is now less likely to occur due to the fix above.
      return res.status(404).json({ error: "Staff not found" });
    }

    // Compare the password submitted by the user with the hash in the database.
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      generateToken(res, user._id, user.email, user.role || 'messadmin');
      return res.status(200).json({ success: true, message: "Password matched" ,
        _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role || 'messadmin'
      });
    } else {
      return res.status(401).json({ success: false, message: "Password does not match" });
    }
  } catch (err) {
    console.error("Password verification error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
};

// ✅ Login route controller
export const loginMessStaff = async (req, res) => {
  const { name, mobile, email } = req.body;

  if (!name || !mobile || !email) {
    return res.status(400).json({ error: "Name, mobile, and email are required" });
  }

  try {
    const user = await MessStaff.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      mobile,
      email: { $regex: new RegExp(`^${email.trim()}$`, "i") },
    });

    if (!user) {
      return res.status(404).json({ error: "Staff not found or invalid credentials" });
    }

    // 🟢 STEP 3: Use the reliable generator to create a safe password.
    const plainPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    user.password = hashedPassword;
    await user.save();

    // Send the safe password via email.
    await transporter.sendMail({
      from: `"Mess Management System" <${process.env.GOOGLE_APP_EMAIL}>`,
      to: email,
      subject: "Your Login Password",
      text: `Hello ${name},\n\nHere is your temporary login password: ${plainPassword}\n\nPlease do not share it with anyone.\n\nRegards,\nMess Management System`,
    });

    res.status(200).json({ message: "Login successful. Password sent to email." });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};

// ✅ Get mess staff
export const getMessStaff = async (req, res) => {
  try {
    const staff = await MessStaff.find({}, "-password"); // hide password field
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: "Error fetching mess staff", details: err.message });
  }
};

// ✅ Update mess staff (complete replacement)
export const updateMessStaff = async (req, res) => {
  const staffList = req.body;

  if (!Array.isArray(staffList)) {
    return res.status(400).json({ error: "Staff list must be an array" });
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

    await MessStaff.deleteMany({});
    await MessStaff.insertMany(formattedStaff);

    res.status(200).json({ message: "Mess staff updated successfully" });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Error updating mess staff", details: err.message });
  }
};

// ✅ Dummy transaction stats
export const transactionStats = async (req, res) => {
  try {
    const stats = await MessStaff.aggregate([
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
