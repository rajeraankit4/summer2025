import express from "express";
import { getMessStaff, updateMessStaff } from "../controllers/messStaff.controller.js";

const router = express.Router();

router.get("/", getMessStaff);
router.put("/", updateMessStaff);

export default router;
