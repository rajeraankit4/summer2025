// backend/models/messStaff.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const messStaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, 'Please provide a mobile number'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false, // Prevents password from being sent in API responses
  },
  dateOfAuthorization: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash the password
messStaffSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const MessStaff = mongoose.model('MessStaff', messStaffSchema);

export default MessStaff;