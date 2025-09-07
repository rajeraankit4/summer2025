import User from "../models/user.model.js";
import { addMessExpense } from "../controllers/expenseController.js";

export const scanAndAddExpense = async (req, res) => {
  try {
    const { qrToken, amount = 55, description = "MessMeal" } = req.body;
    if (!qrToken) {
      return res.status(400).json({ error: "qrToken is required" });
    }
    // Find user by qrToken
    const user = await User.findOne({ qrToken, role: "student" }).populate("studentDetails");
    if (!user || !user.studentDetails) {
      return res.status(404).json({ error: "Student not found" });
    }
    const registrationNumber = user.studentDetails.registrationNumber;
    if (!registrationNumber) {
      return res.status(404).json({ error: "Registration number not found for student" });
    }

    // Find enrollment for studentid
    const enrollmentModel = (await import("../models/enrollment.model.js")).default;
    const enrollment = await enrollmentModel.findOne({ registrationNumber, isActive: true });
    if (!enrollment) {
      return res.status(404).json({ error: "Active enrollment not found for this registration number" });
    }
     // Use common helper to add expense
    const expense = await addMessExpense({
      registrationNumber,
      studentid: enrollment.studentid,
      amount,
      description,
    });

    return res.status(201).json({
      message: "Expense recorded successfully",
      data: {
        registrationNumber: expense.registrationNumber,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
      },
    });
  } catch (err) {
    console.error("Error in /scan:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

export const refreshToken = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user || user.role !== "student") {
      return res.status(404).json({ error: "Student user not found" });
    }
    
    // Generate new QR token
    const newToken = await user.generateQrToken();

    return res.status(200).json({ qrToken: newToken });
  } catch (err) {
    console.error("Error refreshing QR token:", err);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}