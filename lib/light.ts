import { ID } from "./util";

type L = {
  id: ID;
  port: number;
  host: string;
  name?: string;
  // /** return value indicates successful connection */
  connect(): Promise<ConnectedLight>;
};

interface ConnectedLight extends Omit<L, "connect"> {
  getStatus(): string;
  setPower(status: "on" | "off", options: MethodOptions): Promise<void>;
  setBrightness(intensity: number, options: MethodOptions): Promise<void>;
  setColor(color: string, options: MethodOptions): Promise<void>;
  disconnect(): Promise<void>;
}

export interface Light extends L {}

type MethodOptions = { timing: number; transition: "smooth" | "sudden" };
