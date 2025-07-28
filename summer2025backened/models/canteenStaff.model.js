import mongoose from "mongoose";

const canteenStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfAuthorization: { type: Date, default: Date.now },
});

export default mongoose.model("CanteenStaff", canteenStaffSchema);
