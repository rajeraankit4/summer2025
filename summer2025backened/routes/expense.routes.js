import express from "express";
import { createExpense, getTransactions } from "../controllers/expenseController.js";
import { verifyToken, restrictTo } from "../middleware/auth.js";

const router = express.Router();

// Add a new expense
// router.post("/add-expense", verifyToken, restrictTo("messadmin"), createExpense);
router.post("/add-expense", createExpense);

// Get recent expenses
router.get("/transactions", verifyToken, getTransactions);

export default router;
