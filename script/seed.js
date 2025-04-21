// import mongoose from "mongoose";
// import { faker } from "@faker-js/faker";
// import Candidate from "../models/Candidate.js";
// const require = createRequire(import.meta.url);
// import { createRequire } from 'module';
// import dotenv from 'dotenv';
// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI;


// async function seedDB() {
//   await mongoose.connect(MONGO_URI);
//   await Candidate.deleteMany(); // clean old data

//   const candidates = [];

//   for (let i = 0; i < 150000; i++) {
//     const physics = faker.datatype.number({ min: 0, max: 70 });
//     const chemistry = faker.datatype.number({ min: 0, max: 70 });
//     const math = faker.datatype.number({ min: 0, max: 70 });
//     const total = physics + chemistry + math;

//     const disqualifiedSubject = (physics < 20 && "Physics") ||
//                                 (chemistry < 20 && "Chemistry") ||
//                                 (math < 20 && "Math") ||
//                                 null;

//     const passed = total >= 80 && (!disqualifiedSubject || total <= 100 ? false : true);

//     candidates.push({
//       name: faker.person.fullName(),
//       email: faker.internet.email(),
//       hallTicket: faker.string.alphanumeric(10),
//       marks: { physics, chemistry, math },
//       total,
//       rank: 0, // you can sort later to assign rank
//       disqualifiedSubject,
//       passed,
//     });
//   }

//   await Candidate.insertMany(candidates);
//   console.log("DB seeded with 1.5L candidates");
//   process.exit();
// }

// seedDB();



import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Candidate from "../models/Candidate.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

async function seedDB() {
  await mongoose.connect(MONGO_URI);
  await Candidate.deleteMany(); // clean old data

  const candidates = [];

  for (let i = 0; i < 150000; i++) {
    const physics = faker.number.int({ min: 0, max: 70 });
    const chemistry = faker.number.int({ min: 0, max: 70 });
    const math = faker.number.int({ min: 0, max: 70 });
    const total = physics + chemistry + math;

    const disqualifiedSubject =
      (physics < 20 && "Physics") ||
      (chemistry < 20 && "Chemistry") ||
      (math < 20 && "Math") ||
      null;

    const passed =
      total >= 80 && (total > 100 ? !disqualifiedSubject : disqualifiedSubject === null);

    candidates.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      hallTicket: faker.string.alphanumeric(10).toUpperCase(),
      marks: { physics, chemistry, math },
      total,
      rank: 0,
      disqualifiedSubject,
      passed,
    });
  }

  await Candidate.insertMany(candidates);
  console.log("✅ DB seeded with 1.5 lakh candidates!");
  process.exit();
}

seedDB();
