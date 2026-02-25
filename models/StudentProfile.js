import mongoose from "mongoose";

const StudentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  registrationNumber: String,
  department: String,
  year: Number,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.StudentProfile ||
mongoose.model("StudentProfile", StudentProfileSchema);