import mongoose from "mongoose";

const personaldetailSchema = new mongoose.Schema({
  registrationNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  studentid: { 
    type: String, 
    required: true, 
    unique: true 
  },
  firstname: { 
    type: String, 
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  DOB: { 
    type: Date, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  state: { 
    type: String, 
    required: true 
  },
  zipcode: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

const personaldetailModel = mongoose.model(
  "personaldetails",
  personaldetailSchema
);

export default personaldetailModel;