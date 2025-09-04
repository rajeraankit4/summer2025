import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  registrationNumber: { 
    type: String, 
    required: true,
    ref: 'personaldetails'
  },
  hostelRollNo: { 
    type: String, 
    required: true 
  },
  hostelBlock: { 
    type: String, 
    required: true 
  },
  roomNo: { 
    type: String, 
    required: true 
  },
  semester: { 
    type: Number, 
    required: true 
  },
  session: { 
    type: String, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  
  // Signup & Verification fields (each semester)
  imageUrl: { 
    type: String, 
    required: true 
  },
  documents: [{
    name: { 
      type: String, 
      required: true 
    },
    url: { 
      type: String, 
      required: true 
    },
    uploadedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  documentsVerified: { 
    type: Boolean, 
    default: false 
  },
  verificationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, {
  timestamps: true
});

// Add indexes
enrollmentSchema.index({ registrationNumber: 1 });
enrollmentSchema.index({ hostelRollNo: 1, isActive: 1 });

const enrollmentModel = mongoose.model(
  "enrollments",
  enrollmentSchema
);

export default enrollmentModel;