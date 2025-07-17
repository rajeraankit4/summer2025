import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    studentid: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("messexpenses", expenseSchema);
