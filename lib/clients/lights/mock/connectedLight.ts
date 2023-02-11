import {
  Light,
  LightClientConnected,
  MethodOptions,
  PowerMode,
} from "@lib/entities/Light";
import { ID } from "@lib/entities/util";
import { DB } from "./db";

export class MockConnectedLight implements LightClientConnected {
  id: ID;
  port: number;
  host: string;
  name?: string | undefined;
  status: PowerMode;

  constructor(public light: Light, public db: DB) {
    const { id, port, host, name, status } = light;

    this.id = id;
    this.port = port;
    this.host = host;
    this.name = name;
    this.status = status;
  }

  getStatus(): string {
    return "something";
  }
  async setPower(status: PowerMode, options: MethodOptions): Promise<void> {
    const { db } = this;

    await this.db.read();

    if (!db.data) return;

    const lightIndex =
      db.data.lights.findIndex((x) => x.id === this.light.id) || -1;

    if (lightIndex > -1) {
      db.data.lights[lightIndex].status = status;

      await db.write();
    }
  }
  setBrightness(intensity: number, options: MethodOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  setColor(color: string, options: MethodOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  disconnect(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
