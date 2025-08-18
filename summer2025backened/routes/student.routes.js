import express from "express";
import { getStudents, getStudentById, updateStudentProfile, verifyStudent, changeStudentPassword } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudentById);
// router.put("/:id", updateStudentProfile);
router.put("/:id/verify", verifyStudent);

// Change password
router.put("/:id/change-password", changeStudentPassword);

export default router;
