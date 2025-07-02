import Notice from "../models/notice.model.js";

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notices", details: err.message });
  }
};

export const addNotice = async (req, res) => {
  const { text, date } = req.body;
  if (!text || !date) return res.status(400).json({ error: "All fields are required" });

  try {
    const newNotice = new Notice({ text, date });
    await newNotice.save();
    res.status(201).json({ message: "Notice added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding notice", details: err.message });
  }
};
