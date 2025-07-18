import express from "express";
import { getCanteenStaff, updateCanteenStaff , transactionStats, loginCanteenStaff } from "../controllers/canteenStaff.controller.js";
import { verifyToken, restrictTo } from "../middleware/auth.js";
import { verifyCanteenStaffPassword } from "../controllers/canteenStaff.controller.js";


const router = express.Router();

router.get("/", getCanteenStaff);
router.put("/", updateCanteenStaff);
router.get("/stats", transactionStats);
router.post("/login", loginCanteenStaff);
router.post("/verify-password", verifyCanteenStaffPassword);
// 🟢 Create an expense (only for verified canteenadmin// 🟢 Get canteen transactions by role

export default router;
