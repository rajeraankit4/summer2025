import express from "express";
import { getCanteenStaff, addCanteenStaff, updateCanteenStaff , deleteCanteenStaff } from "../controllers/canteenStaff.controller.js";

const router = express.Router();

router.get("/", getCanteenStaff);

router.post("/", addCanteenStaff);

router.delete("/:id", deleteCanteenStaff);
router.put("/:id", updateCanteenStaff);

export default router;
