import MessStaff from "../models/messStaff.model.js";

export const getMessStaff = async (req, res) => {
  try {
    const staff = await MessStaff.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: "Error fetching mess staff", details: err.message });
  }
};

export const updateMessStaff = async (req, res) => {
  const staffList = req.body;
  if (!staffList) return res.status(400).json({ error: "Staff list is required" });

  try {
    await MessStaff.deleteMany({});
    await MessStaff.insertMany(staffList);
    res.status(200).json({ message: "Mess staff updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating mess staff", details: err.message });
  }
};




export const transactionStats = async (req, res) => {
  try {
    
    const stats = await MessStaff.aggregate([
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: "$transactions" },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json(stats[0] || { totalTransactions: 0, totalAmount: 0 });
  } catch (err) {
    res.status(500).json({ error: "Error fetching transaction stats", details: err.message });
  }
};  