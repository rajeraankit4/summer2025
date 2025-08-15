import mongoose from "mongoose";

const messStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: String, required: true },
});

export default mongoose.model("MessStaff", messStaffSchema);
