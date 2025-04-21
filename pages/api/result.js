

import { connectDB } from '../../lib/db.js';
import Candidate from '../../models/Candidate.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    const { hallTicket } = req.query;

    if (!hallTicket) {
      return res.status(400).json({ error: "Hall Ticket is required" });
    }

    const candidate = await Candidate.findOne({ hallTicket: hallTicket.toUpperCase() });

    if (!candidate) {
      return res.status(404).json({ error: "Result not found for given Hall Ticket" });
    }

    res.status(200).json(candidate);
  } catch (err) {
    console.error("Error fetching result:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
