import mongoose from "mongoose";

const personaldetailSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  studentid: {
    type: String,
    required: true,
    unique: true,
  },
  hostelblock: {
    type: String,
    required: true,
  },
  roomno: {
    type: String,
    required: true,
  },
  // Document fields
  documents: [
    {
      type: { type: String, required: true },
      filename: { type: String, required: true },
      originalName: { type: String, required: true },
      path: { type: String, required: true },
      uploadDate: { type: Date, default: Date.now },
    },
  ],
  documentsVerified: { type: Boolean, default: false },
  verificationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const personaldetailModel = mongoose.model(
  "personaldetail",
  personaldetailSchema
);

export default personaldetailModel;
