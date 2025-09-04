import express from "express";
import {
  personaldetailInsert,
  personaldetailList,
  createStudentWithEnrollment,
  uploadDocuments,
  verifyDocuments,
  getPendingVerifications,
  getAllVerifications,
} from "../controllers/personaldetailController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// POST request to insert personal detail
router.post("/insert", personaldetailInsert);
router.post("/register-student", createStudentWithEnrollment); // New combined endpoint
router.get("/view", personaldetailList);

// Document upload and verification routes
router.post(
  "/upload-documents/:regno",
  upload.array("documents", 5),
  uploadDocuments
);
router.patch("/verify-documents/:regno", verifyDocuments);

// Admin verification management routes
router.get("/pending-verifications", getPendingVerifications);
router.get("/all-verifications", getAllVerifications);

// Export the router
export default router;
