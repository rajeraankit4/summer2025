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
    ref: "personaldetails",
  },

  // ✅ QR token for attendance (only for students)
  qrToken: {
    type: String,
    default: "",
    unique: true,
    required: false,
  },
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Helper method to generate a new QR token (only for students)
userSchema.methods.generateQrToken = async function (save = true) {
  if (this.role !== "student") {
    throw new Error("QR token can only be generated for students.");
  }

  // Fetch the personaldetail document
  const PersonalDetail = mongoose.model("personaldetails");
  const personalDetailsDoc = await PersonalDetail.findById(this.studentDetails);

  if (!personalDetailsDoc || !personalDetailsDoc.registrationNumber) {
    throw new Error("Student details or registrationNumber not found.");
  }

  // Random 16-byte hex string
  const randomPart = crypto.randomBytes(16).toString("hex");

  // Append student's unique registrationNumber from personalDetails to make the randomly generated token unique
  const newToken = `${randomPart}-${personalDetailsDoc.registrationNumber}`;

  this.qrToken = newToken;

  if (save) {
    await this.save();
  }

  return newToken;
};


// Auto-generate QR token for students on creation
userSchema.pre("save", async function (next) {
  if (this.isNew && this.role === "student" && !this.qrToken) {
    await this.generateQrToken(false);
  }
  next();
});

export default mongoose.model("User", userSchema);
