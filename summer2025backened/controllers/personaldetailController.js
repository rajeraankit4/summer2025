import personaldetailModel from "../models/personaldetail.model.js";
import enrollmentModel from "../models/enrollment.model.js";
import User from "../models/user.model.js";
import { sendLoginCredentials } from "../middleware/nodemailer.js";
import { generateReadablePassword } from "../utils/passwordGenerator.js";
import bcrypt from "bcrypt";

// Insert personal details and create enrollment in one transaction
export const createStudentWithEnrollment = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phone,
      email,
      DOB,
      address,
      city,
      state,
      zipcode,
      studentid,
      registrationNumber,
      hostelblock,
      roomno,
      imageUrl,
      semester = 1
    } = req.body;

    // Check if student already exists
    const existingStudent = await personaldetailModel.findOne({
      $or: [{ studentid }, { email }, { registrationNumber }],
    });

    let personalDetailsCreated = false;
    let enrollmentCreated = false;

    // Create personal details if doesn't exist
    if (!existingStudent) {
      const newDetail = new personaldetailModel({
        firstname,
        lastname,
        phone,
        email,
        DOB,
        address,
        city,
        state,
        zipcode,
        studentid,
        registrationNumber
      });
      
      await newDetail.save();
      personalDetailsCreated = true;
    }

    // Create enrollment (whether student exists or not)
    const currentYear = new Date().getFullYear();
    const session = `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;

    // Check if active enrollment already exists
    const existingEnrollment = await enrollmentModel.findOne({
      registrationNumber,
      isActive: true
    });

    if (!existingEnrollment) {
      // Deactivate any previous enrollments
      await enrollmentModel.updateMany(
        { registrationNumber },
        { isActive: false }
      );

      // Create new enrollment
      const newEnrollment = new enrollmentModel({
        registrationNumber,
        hostelRollNo: studentid,
        hostelBlock: hostelblock,
        roomNo: roomno,
        semester,
        session,
        imageUrl,
        isActive: true,
        documents: [],
        documentsVerified: false,
        verificationStatus: "pending"
      });

      await newEnrollment.save();
      enrollmentCreated = true;
    }

    res.status(201).json({
      status: 1,
      message: "Student registration completed successfully",
      details: {
        personalDetailsCreated,
        enrollmentCreated: enrollmentCreated || "already exists",
        canProceedToDocuments: true
      }
    });

  } catch (err) {
    console.error("Student registration error:", err);
    
    if (err.code === 11000) {
      res.status(400).json({
        status: 0,
        message: "Student with this ID, email, or registration number already exists",
      });
    } else {
      res.status(500).json({
        status: 0,
        message: "Error during student registration",
        error: err.message,
      });
    }
  }
};

// Insert a new personal detail
export const personaldetailInsert = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phone,
      email,
      DOB,
      address,
      city,
      state,
      zipcode,
      studentid,
      registrationNumber
    } = req.body;

    // Check if student already exists
    const existingStudent = await personaldetailModel.findOne({
      $or: [{ studentid }, { email }, { registrationNumber }],
    });
    if (existingStudent) {
      return res.status(400).send({
        status: 0,
        message: "Student with this ID, email, or registration number already exists",
      });
    }

    const newDetail = new personaldetailModel({
      firstname,
      lastname,
      phone,
      email,
      DOB,
      address,
      city,
      state,
      zipcode,
      studentid,
      registrationNumber
    });
     
    await newDetail.save();

    res.status(201).send({
      status: 1,
      message: "Personal detail saved successfully",
    });
  } catch (err) {
    // Handle duplicate key error
    if (err.code === 11000) {
      res.status(400).send({
        status: 0,
        message: "Student with this ID or email already exists",
      });
    } else {
      res.status(500).send({
        status: 0,
        message: "Error while saving personal detail",
        error: err.message,
      });
    }
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
    const { regno } = req.params; // Permanent registration number
    const { documentTypes } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // 1. Find the active enrollment for this RegNo
    const enrollment = await enrollmentModel.findOne({
      registrationNumber: regno,
      isActive: true,
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Active enrollment not found" });
    }

    // 2. Prepare uploaded documents
    const documents = req.files.map((file, index) => ({
      name: Array.isArray(documentTypes)
        ? documentTypes[index]
        : `document-${index + 1}`,
      url: file.path,
      uploadedAt: new Date(),
    }));

    // 3. Store documents in this active enrollment
    enrollment.documents.push(...documents);
    enrollment.verificationStatus = "pending";
    await enrollment.save();

    res.status(200).json({
      message: "Documents uploaded successfully",
      documents,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Server error during upload",
      error: error.message,
    });
  }
};


// Verify documents for a student
export const verifyDocuments = async (req, res) => {
  try {
    const { regno } = req.params;  // regno comes from the route param
    const { status } = req.body;   // expected values: "approved" or "rejected"

    console.log(`Verification request for regno: ${regno}, status: ${status}`);

    // Find the active enrollment directly using registrationNumber and isActive
    const enrollment = await enrollmentModel.findOne({
      registrationNumber: regno,
      isActive: true
    });

    if (!enrollment) {
      console.log(`No active enrollment found for regno: ${regno}`);
      return res.status(404).json({ message: "Active enrollment not found for this registration number" });
    }

    console.log(`Found enrollment for regno: ${regno}`);

    // Find the permanent student details using the registrationNumber
    const student = await personaldetailModel.findOne({
      registrationNumber: regno
    });

    if (!student) {
      console.log(`No student personal details found for regno: ${regno}`);
      return res.status(404).json({ message: "Student personal details not found" });
    }

    console.log(`Found student details for: ${student.firstname} ${student.lastname}, email: ${student.email}`);

    // Update verification fields
    enrollment.documentsVerified = status === "approved";
    enrollment.verificationStatus = status;
    await enrollment.save();

    console.log(`Updated verification status to: ${status} for regno: ${regno}`);

    // If approved, create user account and send login credentials
    if (status === "approved") {
      try {
        console.log(`Processing approval for student: ${student.email}`);
        
        const existingUser = await User.findOne({ email: student.email });
        let passwordToSend;
        let userCreated = false;

        if (existingUser) {
          console.log(`User already exists for email: ${student.email}, will send existing credentials`);
          // For existing users, we can't send the original password since it's hashed
          // Generate a new password and update the existing user
          passwordToSend = generateReadablePassword(10);
          const hashedPassword = await bcrypt.hash(passwordToSend, 10);
          
          existingUser.password = hashedPassword;
          await existingUser.save();
          console.log(`Updated password for existing user: ${student.email}`);
        } else {
          console.log(`Creating new user account for: ${student.email}`);
          
          // Generate secure password
          passwordToSend = generateReadablePassword(10);
          const hashedPassword = await bcrypt.hash(passwordToSend, 10);

          // Create new user and link to personal details
          const newUser = new User({
            email: student.email,
            password: hashedPassword,
            role: "student",
            isVerified: true,
            studentDetails: student._id, // linking permanent student details
          });

          await newUser.save();
          userCreated = true;
          console.log(`User account created successfully for: ${student.email}`);
        }

        // Always send login credentials when approving
        const fullName = `${student.firstname} ${student.lastname}`;
        console.log(`Attempting to send login credentials to: ${student.email}`);
        
        await sendLoginCredentials(
          student.email,
          fullName,
          student.email,
          passwordToSend
        );

        console.log(`Login credentials sent successfully to ${student.email}`);

      } catch (emailError) {
        console.error("Error creating user account or sending email:", emailError);
        // Don't block document verification even if email fails
      }
    }

    console.log(`Verification process completed for regno: ${regno}`);

    res.status(200).json({
      message: `Documents ${status} successfully`,
      emailSent: status === "approved"
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Server error during verification", error: error.message });
  }
};



// Get pending verifications for admin
export const getPendingVerifications = async (req, res) => {
  try {
    const pendingEnrollments = await enrollmentModel.find({
      verificationStatus: "pending",
      documents: { $exists: true, $not: { $size: 0 } },
    });

    // Manually populate the registration details
    const enrichedEnrollments = await Promise.all(
      pendingEnrollments.map(async (enrollment) => {
        const enrollmentObj = enrollment.toObject();
        
        // Find the personal details by registrationNumber
        const personalDetails = await personaldetailModel.findOne({
          registrationNumber: enrollment.registrationNumber
        });

        if (personalDetails) {
          enrollmentObj.personalDetails = {
            firstname: personalDetails.firstname,
            lastname: personalDetails.lastname,
            email: personalDetails.email,
            studentid: personalDetails.studentid,
            DOB: personalDetails.DOB,
            phone: personalDetails.phone,
            registrationNumber: personalDetails.registrationNumber,
            address: personalDetails.address,
            city: personalDetails.city,
            state: personalDetails.state,
            zipcode: personalDetails.zipcode
          };
        }

        // Store the original registration number string
        enrollmentObj.originalRegistrationNumber = enrollment.registrationNumber;
        return enrollmentObj;
      })
    );

    res.status(200).json({
      status: 1,
      pendingVerifications: enrichedEnrollments,
    });
  } catch (error) {
    console.error("Error fetching pending verifications:", error);
    res.status(500).json({
      status: 0,
      message: "Server error fetching pending verifications",
    });
  }
};

// Get all verifications (for admin dashboard)
export const getAllVerifications = async (req, res) => {
  try {
    const allEnrollments = await enrollmentModel
      .find({
        documents: { $exists: true, $not: { $size: 0 } },
      })
      .sort({ createdAt: -1 });

    // Manually populate the registration details
    const enrichedEnrollments = await Promise.all(
      allEnrollments.map(async (enrollment) => {
        const enrollmentObj = enrollment.toObject();
        
        // Find the personal details by registrationNumber
        const personalDetails = await personaldetailModel.findOne({
          registrationNumber: enrollment.registrationNumber
        });

        if (personalDetails) {
          enrollmentObj.personalDetails = {
            firstname: personalDetails.firstname,
            lastname: personalDetails.lastname,
            email: personalDetails.email,
            studentid: personalDetails.studentid,
            DOB: personalDetails.DOB,
            phone: personalDetails.phone,
            registrationNumber: personalDetails.registrationNumber,
            address: personalDetails.address,
            city: personalDetails.city,
            state: personalDetails.state,
            zipcode: personalDetails.zipcode
          };
        }

        // Store the original registration number string
        enrollmentObj.originalRegistrationNumber = enrollment.registrationNumber;
        return enrollmentObj;
      })
    );

    res.status(200).json({
      status: 1,
      verifications: enrichedEnrollments,
    });
  } catch (error) {
    console.error("Error fetching all verifications:", error);
    res.status(500).json({
      status: 0,
      message: "Server error fetching verifications",
    });
  }
};
