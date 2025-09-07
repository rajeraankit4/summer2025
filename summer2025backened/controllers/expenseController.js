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


// getTransactions: transactions for mess staff/ superadmin (all transactions) or student (own transactions)
export const getTransactions = async (req, res) => {
  console.log("HIT /transactions API"); // <-- add this 
  try {
    const { role, email } = req.user; // Extracted from JWT

    let filter = {};

    // If user is a student, filter by their registrationNumber
    if (role === "student") {
      // Fetch registrationNumber from DB
      const user = await User.findOne({ email, role }).populate("studentDetails", "registrationNumber");

      if (!user || !user.studentDetails?.registrationNumber) {
        return res.status(400).json({
          status: 0,
          message: "Registration number not found for this student",
        });
      }

      const regno = user.studentDetails.registrationNumber;
      filter.registrationNumber = regno.toUpperCase();
    }

    // Fetch latest 50 transactions
    const transactions = await messexpenses
      .find(filter)
      .sort({ date: -1 })
      .limit(50);

    // Format response
    const formatted = transactions.map(
      ({ _id, studentid, registrationNumber, email, amount, description, date }) => ({
        _id,
        studentid,
        registrationNumber,
        email,
        amount,
        description,
        date,
      })
    );

    return res.status(200).json({
      status: 1,
      message: "Transactions fetched successfully",
      data: formatted,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({
      status: 0,
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};