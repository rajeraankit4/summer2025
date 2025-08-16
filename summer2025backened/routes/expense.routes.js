import express from "express";
import { createExpense, getRecentExpenses } from "../controllers/expenseController.js";

const router = express.Router();

// Add a new expense
router.post("/add-expense", createExpense);

// Get recent expenses
router.get("/transactions", getRecentExpenses);

// Get expenses for a specific student
import { getStudentExpenses } from "../controllers/expenseController.js";
router.get("/transactions/:studentid", getStudentExpenses);

export default router;
