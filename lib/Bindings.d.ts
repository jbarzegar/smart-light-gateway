import { BridgeInfo } from "./entities/Bridge";
import { BridgeAction } from "./entities/BridgeAction";
import { BridgeDevice, NewBridgeDevice } from "./entities/BridgeDevice";

/** Interface to implement a bridge binding */
export interface BridgeBindings<T extends BridgeAction<string, unknown>> {
  getInfo(): Promise<BridgeInfo>;
  getDevices(): Promise<BridgeDevice<T>[]>;
  getDevice(id: string): Promise<BridgeDevice<T>>;
  createDevice(device: NewBridgeDevice<T>): Promise<BridgeDevice<T>>;
  updateDevice(
    id: string,
    update: Partial<NewBridgeDevice<T>>
  ): Promise<BridgeDevice<T>>;
  deleteDevice(id: string): Promise<{ deleted: boolean }>;
}
