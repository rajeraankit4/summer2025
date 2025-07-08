import personaldetailModel from "../models/personaldetail.model.js";

// Insert a new personal detail
export const personaldetailInsert = async (req, res) => {
  try {
    const { firstname, lastname, phone, DOB,  address, city, state,  zipcode,  studentid,  hostelblock,roomno} = req.body;

    const newDetail = new personaldetailModel({
      firstname,
      lastname,
      phone,
      DOB,
      address,
      city,
      state,
      zipcode,
     studentid,
     hostelblock,
     roomno, 

    });

    await newDetail.save();

    res.status(201).send({
      status: 1,
      message: "Personal detail saved successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: "Error while saving personal detail",
      error: err.message,
    });
  }
};




// Fetch all personal details
export const personaldetailList = async (req, res) => {
  try {
    const details = await personaldetailModel.find();
    res.status(200).send({
      status: 1,
      personaldetailList: details,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: "Error fetching details",
      error: err.message,
    });
  }
};
