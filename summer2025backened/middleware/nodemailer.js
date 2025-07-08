import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

// Verify connection once at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Email service connection failed:", error);
  } else {
    console.log("Email service ready to send messages.");
  }
});

// ✅ Student Signup Email
const studentsignup = async (to, email, password) => {
  try {
    const mailOptions = {
      from: process.env.GOOGLE_APP_EMAIL,
      to,
      subject: "Sign Up Successful",
      text: `Welcome to the Mess and Canteen Management System!

Your account has been created successfully.

Here are your login credentials:
Email: ${email}
Password: ${password}

Please keep this information safe and do not share it with anyone.

Thank you,
Mess and Canteen Management Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Signup email sent to", to);
  } catch (error) {
    console.error("Error sending signup email:", error);
  }
};

// ✅ OTP Verification Email
const sendOtpVerificationEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: process.env.GOOGLE_APP_EMAIL,
      to,
      subject: "OTP Verification - Mess and Canteen Management System",
      text: `Dear User,

We received a request to verify your email address. Please use the One-Time Password (OTP) below to complete your verification:

Your OTP: ${otp}

This OTP is valid for the next 10 minutes. Do not share it with anyone.

If you didn't request this, please ignore this email.

Best regards,  
Mess and Canteen Management Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to", to);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

// ✅ Export both functions
export { studentsignup, sendOtpVerificationEmail };
