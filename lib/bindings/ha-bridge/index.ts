import { BridgeBindings } from "@lib/Bindings";
import { BridgeInfo } from "@lib/entities/Bridge";
import { BridgeAction } from "@lib/entities/BridgeAction";
import { BridgeDevice, NewBridgeDevice } from "@lib/entities/BridgeDevice";

/** TODO: Reference https://github.com/jbarzegar/smart-light-gateway/blob/master/workspaces/api/lib/bridge/bindings/ha-bridge.ts */
class HaBridgeBinding implements BridgeBindings<BridgeAction<string, unknown>> {
  getInfo(): Promise<BridgeInfo> {
    throw new Error("Method not implemented.");
  }
  getDevices(): Promise<BridgeDevice<{ name: string; payload: unknown }>[]> {
    throw new Error("Method not implemented.");
  }
  getDevice(
    id: string
  ): Promise<BridgeDevice<{ name: string; payload: unknown }>> {
    throw new Error("Method not implemented.");
  }
  createDevice(
    device: NewBridgeDevice<{ name: string; payload: unknown }>
  ): Promise<BridgeDevice<{ name: string; payload: unknown }>> {
    throw new Error("Method not implemented.");
  }
  updateDevice(
    id: string,
    update: Partial<NewBridgeDevice<{ name: string; payload: unknown }>>
  ): Promise<BridgeDevice<{ name: string; payload: unknown }>> {
    throw new Error("Method not implemented.");
  }
  deleteDevice(id: string): Promise<{ deleted: boolean }> {
    throw new Error("Method not implemented.");
  }
}
