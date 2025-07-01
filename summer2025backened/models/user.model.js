import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hostelNo: { type: Number, required: true },
  phoneNo: { type: Number, required: true },
  password: { type: String, required: true }
});

export default mongoose.model("User", userSchema);
