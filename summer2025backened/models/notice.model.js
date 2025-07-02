import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: String, required: true },
});

export default mongoose.model("Notice", noticeSchema);
