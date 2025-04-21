import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  hallTicket: String,
  marks: {
    physics: Number,
    chemistry: Number,
    math: Number,
  },
  total: Number,
  rank: Number,
  disqualifiedSubject: String,
  passed: Boolean,
});

export default mongoose.models.Candidate || mongoose.model("Candidate", CandidateSchema);
