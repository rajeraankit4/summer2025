import Stats from "../models/stats.model.js";

export const getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne();
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: "Error fetching stats", details: err.message });
  }
};
