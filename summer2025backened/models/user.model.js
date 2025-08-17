import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, default: "password" },
  role: {
    required: true,
    type: String,
    enum: ["student", "superadmin", "canteenadmin", "messadmin"],
  },
  isVerified: { type: Boolean, default: false },

  // ✅ Link to student details if this user is a student
  studentDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "personaldetail",
  },

  // ✅ QR token for attendance (only for students)
  qrToken: {
    type: String,
    default: "",
    required: false,
  },
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Helper method to generate a new QR token (only for students)
userSchema.methods.generateQrToken = async function () {
  if (this.role !== "student") {
    throw new Error("QR token can only be generated for students.");
  }
  // Generate a random string (32 hex chars)
  const newToken = crypto.randomBytes(16).toString("hex");
  this.qrToken = newToken;
  await this.save();
  return newToken;
};


// Auto-generate QR token for students on creation
userSchema.pre("save", async function (next) {
  if (this.isNew && this.role === "student" && !this.qrToken) {
    // Generate QR token directly, do not call save()
    const newToken = crypto.randomBytes(16).toString("hex");
    this.qrToken = newToken;
  }
  next();
});

export default mongoose.model("User", userSchema);
