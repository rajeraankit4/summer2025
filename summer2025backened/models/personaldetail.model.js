import mongoose from "mongoose";

const personaldetailSchema = new mongoose.Schema({
  // ... all other fields are correct ...
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  DOB: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  studentid: { type: String, required: true, unique: true },
  hostelblock: { type: String, required: true },
  roomno: { type: String, required: true },

  // ✅ FIX: Change this line
  imageUrl: { // Changed from imageurl to imageUrl
    type: String,
    required: true,
  },

  // ... rest of the schema is correct ...
  documents: [
    // ...
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