import express from "express";
import {
  getMessStaff,
  updateMessStaff,
  transactionStats,
  loginMessStaff
} from "../controllers/messStaff.controller.js";
import { verifyMessStaffPassword } from "../controllers/messStaff.controller.js";
import {
  createExpense,
  getMessTransactionsByRole
} from "../controllers/expenseController.js";

import { verifyToken, restrictTo } from "../middleware/auth.js";

const router = express.Router();

// 🟢 Login route
router.post("/login", loginMessStaff);

// 🟢 Get and update mess staff
router.get("/", getMessStaff);
router.put("/", updateMessStaff);

// 🟢 Get transaction stats
router.get("/stats", transactionStats);

// 🟢 Create an expense (only for verified messadmin)
router.post("/add-expense", verifyToken, restrictTo("messadmin"), createExpense);

// 🟢 Get mess transactions by role
router.get("/transactions", verifyToken, getMessTransactionsByRole);

// 🟢 Verify password
router.post("/verify-password", verifyMessStaffPassword);

export default router;
