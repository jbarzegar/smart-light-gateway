import { BridgeAction as XAction } from "./BridgeAction";
import { BridgeDevices } from "./BridgeDevice";

/** A mapped collection of information retrieved from the bridges api. */
export type BridgeInfo = {
  name: string;
  modelId: string;
  bridgeId: string;
  gateway: string;
  macAddress: string;
  ipAddress: string;
  version: {
    api: string;
    software: string;
  };
  time: {
    zone: string;
    utc: Date;
    local: Date;
  };
};

export type Bridge<T extends XAction<string, unknown>> = {
  getInfo(): Promise<BridgeInfo>;
  device: BridgeDevices<T>;
};
