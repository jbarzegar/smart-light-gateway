import { ID } from "./util";

export interface Light {
  id: ID;
  port: number;
  host: string;
  name?: string;
  connectionStatus: "disconnected" | "connected";
  // /** return value indicates successful connection */
  connect(): Promise<ConnectedLight>;
}

type MethodOptions = { timing: number; transition: "smooth" | "sudden" };

interface ConnectedLight extends Omit<Light, "connect"> {
  setPower(status: "on" | "off", options: MethodOptions): Promise<void>;
  setBrightness(intensity: number, options: MethodOptions): Promise<void>;
  setColor(color: string, options: MethodOptions): Promise<void>;
  disconnect(): Promise<Light>;
}
