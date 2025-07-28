// backend/models/messStaff.model.js
import mongoose from "mongoose";

const messStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfAuthorization: { type: Date, default: Date.now },
});

export default mongoose.model("MessStaff", messStaffSchema);