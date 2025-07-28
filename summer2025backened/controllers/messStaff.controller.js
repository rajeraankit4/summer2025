// backend/controllers/messStaff.controller.js
import MessStaff from "../models/messStaff.model.js";

// GET all mess staff (this is already correct)
export const getMessStaff = async (req, res) => {
  try {
    const staff = await MessStaff.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: "Error fetching mess staff", details: err.message });
  }
};

// POST (add) a new staff member
export const addMessStaff = async (req, res) => {
  const { name, mobile, email } = req.body;
  if (!name || !mobile || !email) { // Also validate email
    return res.status(400).json({ error: "Name, mobile, and email are required" });
  }

  try {
    const newStaff = new MessStaff({ name, mobile, email });
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (err) {
    // Handle potential duplicate email error from the model's 'unique: true'
    if (err.code === 11000) {
        return res.status(409).json({ error: "A staff member with this email already exists." });
    }
    res.status(500).json({ error: "Error adding mess staff", details: err.message });
  }
};

// PUT (update) a specific staff member
export const updateMessStaff = async (req, res) => {
  const { id } = req.params;
  const { name, mobile, email } = req.body;

  try {
    const updatedStaff = await MessStaff.findByIdAndUpdate(
      id,
      { name, mobile, email },
      { new: true, runValidators: true }
    );
    if (!updatedStaff) return res.status(404).json({ error: "Mess staff not found" });
    res.status(200).json(updatedStaff);
  } catch (err) {
    res.status(500).json({ error: "Error updating mess staff", details: err.message });
  }
};

// DELETE a staff member (this is already correct)
export const deleteMessStaff = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStaff = await MessStaff.findByIdAndDelete(id);
    if (!deletedStaff) return res.status(404).json({ error: "Mess staff not found" });
    res.status(200).json({ message: "Mess staff member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting mess staff", details: err.message });
  }
};



export const transactionStats = async (req, res) => {
  try {
    const stats = await MessStaff.aggregate([
      { $group: { _id: null, totalTransactions: { $sum: 0 }, totalAmount: { $sum: 0 } } },
    ]);
    res.status(200).json(stats[0] || { totalTransactions: 0, totalAmount: 0 });
  } catch (err) {
    res.status(500).json({ error: "Error fetching transaction stats", details: err.message });
  }
};