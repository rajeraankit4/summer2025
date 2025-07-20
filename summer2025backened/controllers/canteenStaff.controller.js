import CanteenStaff from "../models/canteenStaff.model.js";

export const getCanteenStaff = async (req, res) => {
  try {
    const staff = await CanteenStaff.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: "Error fetching canteen staff", details: err.message });
  }
};

export const updateCanteenStaff = async (req, res) => {
  const staffList = req.body;
  if (!staffList) return res.status(400).json({ error: "Staff list is required" });

  try {
    await CanteenStaff.deleteMany({});
    await CanteenStaff.insertMany(staffList);
    res.status(200).json({ message: "Canteen staff updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating canteen staff", details: err.message });
  }
};
