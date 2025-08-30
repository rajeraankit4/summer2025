import Stats from "../models/stats.model.js";
import resetAllStats from "../utils/Meal_reset.js";
import personaldetailModel from "../models/personaldetail.model.js";

export const getStats = async (req, res) => {
  try {
    // Optionally run reset daily here (or better: with cron)
    // await resetAllStats();

    const totalStudents = await personaldetailModel.countDocuments();

    // Get stats document (assuming you have only one global stats doc)
    const stats = await Stats.findOne().lean();

    if (!stats) {
      return res.status(404).json({ error: "Stats document not found" });
    }

    res.status(200).json({
      totalStudents,
      mealsToday: stats.mealsToday,
      canteenOrders: stats.canteenOrders,
      mealData: stats.mealData, // full meal history
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching stats", details: err.message });
  }
};
