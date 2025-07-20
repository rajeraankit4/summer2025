import express from "express";
import { getMessStaff, updateMessStaff ,transactionStats } from "../controllers/messStaff.controller.js";
import { createExpense , getMessTransactionsByRole } from "../controllers/expenseController.js";
import { verifyToken, restrictTo } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMessStaff);
router.put("/", updateMessStaff);
router.get("/stats", transactionStats);

router.post("/add-expense", verifyToken, restrictTo("messadmin"), createExpense);

router.get("/transactions", verifyToken, getMessTransactionsByRole);

export default router;
