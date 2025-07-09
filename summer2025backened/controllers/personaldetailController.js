import personaldetailModel from "../models/personaldetail.model.js";

// Insert a new personal detail
export const personaldetailInsert = async (req, res) => {
  try {
    const {
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
    } = req.body;

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

// Upload documents for a student
export const uploadDocuments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { documentTypes } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Find the student's personal details
    const student = await personaldetailModel.findOne({ studentid: studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Process uploaded files
    const documents = req.files.map((file, index) => ({
      type: Array.isArray(documentTypes)
        ? documentTypes[index]
        : `document-${index + 1}`,
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      uploadDate: new Date(),
    }));

    // Add documents to student record
    student.documents.push(...documents);
    student.verificationStatus = "pending";
    await student.save();

    res.status(200).json({
      message: "Documents uploaded successfully",
      documents: documents,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during upload" });
  }
};

// Verify documents for a student
export const verifyDocuments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    const student = await personaldetailModel.findOne({ studentid: studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.documentsVerified = status === "approved";
    student.verificationStatus = status;
    await student.save();

    res.status(200).json({ message: `Documents ${status} successfully` });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Server error during verification" });
  }
};
