import { BridgeAction } from "./BridgeAction";

export type BridgeActionNames = "on" | "off" | "dim" | "color";

/** Defines possible actions that the bridge can/should support */
type BridgeActionRecord<T extends BridgeAction<string, unknown>> = Record<
  `${BridgeActionNames}Actions`,
  T[]
>;

export interface BridgeDevice<
  T extends BridgeAction<string, unknown> = BridgeAction<string, unknown>
> extends BridgeActionRecord<T> {
  id: string;
  name: string;
}

export interface NewBridgeDevice<T extends BridgeAction<string, unknown>>
  extends Partial<BridgeActionRecord<T>> {
  name: string;
}

/** Collection to manipulate bridge devices */
export interface BridgeDevices<T extends BridgeAction<string, unknown>> {
  /** Get all devices */
  getAll(): Promise<BridgeDevice<T>[]>;
  /** Gets a device by ID */
  get(id: string): Promise<BridgeDevice<T>>;
  /** Registers new bridge device. */
  create(device: NewBridgeDevice<T>): Promise<BridgeDevice<T>>;
  /** Fetches a device by ID, updates the Device using a **shallow** merge */
  update(
    id: string,
    updateData: Partial<NewBridgeDevice<T>>
  ): Promise<BridgeDevice<T>>;
  /** Deletes item by ID */
  delete(id: string): Promise<void>;
}
