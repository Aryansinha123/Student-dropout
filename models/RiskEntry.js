import mongoose from "mongoose";

const RiskEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  features: Object,
  fuzzyScore: Number,
  annProbability: Number,
  finalScore: Number,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.RiskEntry ||
mongoose.model("RiskEntry", RiskEntrySchema);