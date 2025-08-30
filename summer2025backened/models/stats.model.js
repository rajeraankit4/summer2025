import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  totalStudents: { type: Number, default: 0 },
  mealsToday: { type: Number, default: 0 },
  canteenOrders: { type: Number, default: 0 },
  mealData: [
    {
      day: { type: String },
      meals: { type: Number, default: 0 },
    },
  ],
  lastReset: { type: Date, default: new Date() },
});

export default mongoose.model("Stats", statsSchema);
