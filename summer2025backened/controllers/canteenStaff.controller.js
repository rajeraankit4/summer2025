import CanteenStaff from "../models/canteenStaff.model.js";

export const getCanteenStaff = async (req, res) => {
  try {
    const staff = await CanteenStaff.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: "Error fetching canteen staff", details: err.message });
  }
};

export const addCanteenStaff = async (req, res) => {
  const { name, mobile, email } = req.body;

  // Basic validation
  if (!name || !mobile || !email) {
    return res.status(400).json({ error: "Name, mobile, and email are required fields" });
  }

  try {
    const newStaff = new CanteenStaff({
      name,
      mobile,
      email,
    });

    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff); // 201 Created is more appropriate here
  } catch (err) {
    // Handle potential duplicate email error
    if (err.code === 11000) {
        return res.status(409).json({ error: "Error adding staff", details: "Email already exists." });
    }
    res.status(500).json({ error: "Error adding canteen staff", details: err.message });
  }
};



export const updateCanteenStaff = async (req, res) => {
    const { id } = req.params;
    const { name, mobile, email } = req.body;

    // Basic validation
    if (!name || !mobile || !email) {
        return res.status(400).json({ error: "Name, mobile, and email are required fields" });
    }

    try {
        const updatedStaff = await CanteenStaff.findByIdAndUpdate(
            id,
            { name, mobile, email },
            { new: true, runValidators: true } // 'new: true' returns the updated document
        );

        if (!updatedStaff) {
            return res.status(404).json({ error: "Staff member not found" });
        }

        res.status(200).json(updatedStaff);
    } catch (err) {
        res.status(500).json({ error: "Error updating canteen staff", details: err.message });
    }
};



export const deleteCanteenStaff = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStaff = await CanteenStaff.findByIdAndDelete(id);

        if (!deletedStaff) {
            return res.status(404).json({ error: "Staff member not found" });
        }

        res.status(200).json({ message: "Canteen staff member deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting canteen staff", details: err.message });
    }
};