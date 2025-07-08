import mongoose from 'mongoose';

const personaldetailSchema = new mongoose.Schema({
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
    required: true
  },
  DOB: {
    type: String,
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

  
   studentid: {
    type: String,
    required: true
  },

    hostelblock: {
    type: String,
    required: true
  },
 
  roomno: {
    type: String,
    required: true
  },


});

const personaldetailModel = mongoose.model('personaldetail', personaldetailSchema);

export default personaldetailModel;
