import mongoose from "mongoose";

const canteenStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: String, required: true },
  email: { type: String, required: true , unique: true },
  password: { type: String, required: true , default: "NEEDS_RESET"},
});

export default mongoose.model("CanteenStaff", canteenStaffSchema);
