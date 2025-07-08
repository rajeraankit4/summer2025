import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true,default: "password" },
  role: {
    type: String,
    enum: ["student", "superadmin", "canteenadmin", "messadmin"],
    default: "student",
  },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);