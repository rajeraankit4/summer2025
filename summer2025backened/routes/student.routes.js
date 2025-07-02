import express from "express";
import { getStudents, getStudentById, updateStudentProfile, verifyStudent } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudentProfile);
router.put("/:id/verify", verifyStudent);

export default router;
