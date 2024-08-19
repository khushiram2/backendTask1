import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  amount: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "category" },
  description: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true })



const Entry = mongoose.model("entry", entrySchema)
export default Entry
