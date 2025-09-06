import User from "../models/user.model.js";
import personaldetailModel from "../models/personaldetail.model.js";
import messexpenses from "../models/messtransaction.model.js";
import Stats from "../models/stats.model.js";
import enrollmentModel from "../models/enrollment.model.js";

// ✅ Create Expense
export const createExpense = async (req, res) => {
  try {
    const { studentid, amount, description } = req.body;
    console.log("Request body:", req.body);

    if (!studentid || !amount) {
      return res
        .status(400)
        .json({ message: "Student ID and amount are required" });
    }

    // Ensure description is not empty, provide default if needed
    const finalDescription = description?.trim() || "Mess Expense";
    console.log("📝 Description handling:", {
      original: description,
      final: finalDescription,
      isEmpty: !description || description.trim() === "",
    });

    // Find enrollment by studentid
    const enrollment = await enrollmentModel.findOne({ studentid, isActive: true });
    if (!enrollment) {
      return res.status(404).json({ message: "Active enrollment not found for this studentid" });
    }
    // Use common helper to add expense
    const expense = await addMessExpense({
      registrationNumber: enrollment.registrationNumber,
      studentid,
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
  } catch (error) {
    console.error("Error adding mess expense:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const addMessExpense = async ({ registrationNumber, studentid, amount, description }) => {
  if (!registrationNumber || !studentid || !amount) {
    throw new Error("Missing required fields: registrationNumber, studentid, or amount");
  }

  // Create and save expense
  const expense = new messexpenses({
    registrationNumber,
    studentid,
    amount,
    description: description?.trim() || "Mess Expense",
  });

  await expense.save();
  return expense;
};


// ✅ Get Recent Expenses (for frontend table)
export const getRecentExpenses = async (req, res) => {
  try {
    const transactions = await messexpenses.find().sort({ date: -1 }).limit(50);
    const formatted = transactions.map(
      ({ _id, studentid, email, amount, description, date }) => ({
        _id,
        studentid,
        email,
        amount,
        description,
        date,
      })
    );
    res.status(200).json({
      status: 1,
      message: "Recent expenses fetched successfully",
      data: formatted,
    });
  } catch (error) {
    console.error("Error fetching recent expenses:", error);
    res.status(500).json({
      status: 0,
      message: "Failed to fetch recent expenses",
      error: error.message,
    });
  }
}; // <-- ✅ Closing getRecentExpenses

// ✅ Unified Get Mess Transactions (role + optional :studentid)
export const getMessTransactions = async (req, res) => {
  try {
    const { role, email } = req.user;
    const trimmedEmail = email.trim();
    const { studentid } = req.params; // <-- from URL param, not query

    let transactions = [];

    if (role === "superadmin" || role === "messadmin") {
      if (studentid) {
        // fetch only this student's transactions
        transactions = await messexpenses
          .find({ studentid: studentid.toUpperCase() })
          .sort({ date: -1 });
      } else {
        // fetch all
        transactions = await messexpenses.find().sort({ date: -1 });
      }
    } else if (role === "student") {
      transactions = await messexpenses
        .find({
          email: { $regex: `^${trimmedEmail}$`, $options: "i" },
        })
        .sort({ date: -1 });
    } else {
      return res.status(403).json({
        status: 0,
        message: "Unauthorized access",
      });
    }

    const formatted = transactions.map(
      ({ _id, studentid, email, amount, description, date }) => ({
        _id,
        studentid,
        email,
        amount,
        description,
        date,
      })
    );

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