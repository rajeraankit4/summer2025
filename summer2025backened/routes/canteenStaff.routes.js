import express from "express";
import { getCanteenStaff, updateCanteenStaff } from "../controllers/canteenStaff.controller.js";

const router = express.Router();

router.get("/", getCanteenStaff);
router.put("/", updateCanteenStaff);

export default router;
