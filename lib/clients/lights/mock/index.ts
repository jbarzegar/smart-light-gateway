import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Light } from "@lib/entities/Light";
import { DiscoverClient } from "@lib/DiscoverClient";
import { MockConnectedLight } from "./connectedLight";
import { createDB } from "./db";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

const db = await createDB(file);

export class MockClient implements DiscoverClient<Light> {
  async cleanup() {
    return;
  }

  async discoverAllLights(): Promise<Light[]> {
    await db.read();

    if (db.data) {
      const d = db.data?.lights.map((l) => ({
        ...l,
        connect: new MockConnectedLight(l, db),
      }));
      return d;
    }

    return [];
  }
}
