import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Candidate from "../models/Candidate.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

async function seedDB() {
  await mongoose.connect(MONGO_URI);
  await Candidate.deleteMany();

  const candidates = [];

  for (let i = 0; i < 150000; i++) {
    const physics = faker.number.int({ min: 0, max: 70 });
    const chemistry = faker.number.int({ min: 0, max: 70 });
    const math = faker.number.int({ min: 0, max: 70 });
    const total = physics + chemistry + math;

    const disqualified = [];
    if (physics < 20) disqualified.push("Physics");
    if (chemistry < 20) disqualified.push("Chemistry");
    if (math < 20) disqualified.push("Math");

    const disqualifiedSubjects = disqualified.join(", "); // comma-separated string

    const passed =
      total >= 80 &&  disqualified.length === 0;

    candidates.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      hallTicket: faker.string.alphanumeric(10).toUpperCase(),
      marks: { physics, chemistry, math },
      total,
      rank: 0,
      disqualifiedSubjects,
      passed,
    });
  }

  await Candidate.insertMany(candidates);
  console.log("✅ DB seeded with 1.5 lakh candidates!");
  process.exit();
}

seedDB();
