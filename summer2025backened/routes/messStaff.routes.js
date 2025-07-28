import express from "express";
import {
  getMessStaff,
  updateMessStaff,
  addMessStaff,
  deleteMessStaff,
  transactionStats,
} from "../controllers/messStaff.controller.js";
import {
  createExpense,
  getMessTransactionsByRole,
} from "../controllers/expenseController.js";
import { verifyToken, restrictTo } from "../middleware/auth.js";

const router = express.Router();

// Add a simple test route first
router.get("/test", (req, res) => {
  res.json({ message: "Mess staff routes are working!" });
});

// Add a test route for transactions without auth
router.get("/transactions-test", (req, res) => {
  res.json({
    message: "Transactions route is reachable",
    timestamp: new Date().toISOString(),
    status: 1,
    data: [],
  });
});

router.get("/", getMessStaff);
router.post("/", addMessStaff);
router.delete("/:id", deleteMessStaff);
router.put("/:id", updateMessStaff);
router.get("/stats", transactionStats);

router.post(
  "/add-expense",
  verifyToken,
  restrictTo("messadmin"),
  createExpense
);

router.get("/transactions", verifyToken, getMessTransactionsByRole);

export default router;
