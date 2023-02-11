import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import { Light } from "@lib/entities/Light";
import { mockLights } from "./data";

interface MockData {
  lights: Light[];
}

export type DB = Low<MockData>;

export async function createDB(filePath: string) {
  const adapter = new JSONFile<MockData>(filePath);
  const db = new Low<MockData>(adapter);

  await db.read();

  if (!db?.data) db.data = { lights: mockLights };

  return db;
}
