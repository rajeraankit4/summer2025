import User from "../models/user.model.js";
import personaldetailModel from "../models/personaldetail.model.js";
import messexpenses from "../models/messtransaction.model.js";

// ✅ Create Expense
export const createExpense = async (req, res) => {
  try {
    const { studentid, amount, description } = req.body;
    console.log("Request body:", req.body);

    if (!studentid || !amount) {
      return res.status(400).json({ message: "Student ID and amount are required" });
    }

    const studentDetail = await personaldetailModel.findOne({ studentid });
    
    if (!studentDetail) {
      return res.status(404).json({ message: "Student not found" });
    }

    const user = await User.findOne({ studentDetails: studentDetail._id });
    console.log("User found:", user);
    if (!user) {
      return res.status(404).json({ message: "User not linked to this student" });
    }

    const expense = new messexpenses({
      email: user.email, // ✅ for lookup
      studentid,          // ✅ for display
      amount,
      description,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense recorded successfully",
      data: {
        studentid: expense.studentid,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
      },
    });
  } catch (error) {
    console.error("Error adding mess expense:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Transactions Based on Role
export const getMessTransactionsByRole = async (req, res) => {
  try {
    const { role, email } = req.user;
    const trimmedEmail = email.trim();

    let transactions = [];

    if (role === "superadmin" || role === "messadmin") {
      transactions = await messexpenses.find().sort({ date: -1 });
    } else if (role === "student") {
      transactions = await messexpenses.find({
        email: { $regex: `^${trimmedEmail}$`, $options: "i" },
      }).sort({ date: -1 });
    } else {
      return res.status(403).json({
        status: 0,
        message: "Unauthorized access",
      });
    }
    const formatted = transactions.map(({ studentid, amount, description, date }) => ({
      studentid,
      amount,
      description,
      date,
    }));

    console.log("Formatted transactions:", formatted);

    res.status(200).json({
      status: 1,
      message: "Transactions fetched successfully",
      data: formatted,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({
      status: 0,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

