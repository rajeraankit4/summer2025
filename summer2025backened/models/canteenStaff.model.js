import mongoose from "mongoose";

const canteenStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: String, required: true },
});

export default mongoose.model("CanteenStaff", canteenStaffSchema);
