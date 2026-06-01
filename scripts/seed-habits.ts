import { db } from "../src/db";
import { habits } from "../src/db/schema";

async function seed() {
  await db.insert(habits).values([
    { name: "Train", description: "Hit the gym", frequency: "daily" },
    { name: "Stay Clean", description: "No", frequency: "daily" },
    {
      name: "Night Brush",
      description: "Brush before bed",
      frequency: "daily",
    },
  ]);
  console.log("Habits seeded.");
  process.exit(0);
}

seed();
