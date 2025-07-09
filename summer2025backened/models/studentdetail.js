const mongoose = require("mongoose");

const studentDetailsSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: String,
  department: String,
  year: Number,
  // other profile fields
});

module.exports = mongoose.model("StudentDetails", studentDetailsSchema);
