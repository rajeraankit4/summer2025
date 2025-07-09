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
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
