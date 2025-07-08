import express from "express";
import { getMessStaff, updateMessStaff ,transactionStats } from "../controllers/messStaff.controller.js";

const router = express.Router();

router.get("/", getMessStaff);
router.put("/", updateMessStaff);
router.get("/stats", transactionStats);

export default router;
