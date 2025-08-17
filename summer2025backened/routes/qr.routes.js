import express from "express";
import messexpenses from "../models/messtransaction.model.js";
import User from "../models/user.model.js";

const router = express.Router();

// POST /api/qr/scan
router.post("/scan", async (req, res) => {
  try {
    const { qrToken } = req.body;
    if (!qrToken) {
      return res.status(400).json({ error: "qrToken is required" });
    }
    // Find user by qrToken
    const user = await User.findOne({ qrToken, role: "student" }).populate("studentDetails");
    if (!user || !user.studentDetails) {
      return res.status(404).json({ error: "Student not found" });
    }
    const studentDetail = user.studentDetails;
    // Create expense
    const expense = new messexpenses({
      studentid: studentDetail.studentid,
      email: studentDetail.email,
      amount: 50,
      description: "Mess Meal",
    });
    await expense.save();
    return res.status(201).json({
      message: "Expense recorded successfully",
      student: {
        name: `${studentDetail.firstname} ${studentDetail.lastname}`,
        email: studentDetail.email,
      },
      expense: {
        studentid: expense.studentid,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
