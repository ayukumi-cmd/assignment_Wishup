import { connectDB } from '../../lib/db.js';
import Candidate from '../../models/Candidate.js';

export default async function handler(req, res) {
  await connectDB();
  const { hallTicket } = req.query;

  const candidate = await Candidate.findOne({ hallTicket });
  if (!candidate) return res.status(404).json({ error: "Not found" });

  res.status(200).json(candidate);
}
