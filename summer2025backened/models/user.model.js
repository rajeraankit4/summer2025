import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  // Signup Flow
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "superadmin", "canteenadmin", "messadmin"],
    default: "student",
  },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },

  // Personal Details
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  studentId: { type: String },
  hostelBlock: { type: String },
  roomNumber: { type: String },
  mealPlan: { type: String },
  dietaryRestrictions: { type: String },

  // Documents
  documents: [documentSchema],
});

export default mongoose.model("User", userSchema);