import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    required: true,
  },
  items: [
    {
      type: String,
      required: true,
    },
  ],
  description: { type: String },
  calories: { type: Number },
  price: { type: Number },
});

const menuSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
    unique: true, // Each day should have only one menu
  },
  meals: [mealSchema],
  isActive: { type: Boolean, default: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Index for efficient queries
menuSchema.index({ day: 1 });

export default mongoose.model("Menu", menuSchema);
