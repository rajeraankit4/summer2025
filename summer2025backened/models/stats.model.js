import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  totalStudents: { type: Number, default: 0 },
  mealsToday: { type: Number, default: 0 },
  canteenOrders: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  mealData: [{ day: String, meals: Number }],
  revenueData: [{ day: String, revenue: Number }],
});

export default mongoose.model("Stats", statsSchema);
