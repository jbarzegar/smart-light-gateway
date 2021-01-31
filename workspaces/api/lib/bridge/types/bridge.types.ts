import { PrimitiveObject } from '@gateway/types/util'

/** Defines an action that can be sent from the bridge to our api */
export type XAction<A extends string = string, P extends any = any> = {
  name: A
  payload: P
}

export type BridgeActionNames = 'on' | 'off' | 'dim' | 'color'

/** Defines possible actions that the bridge can/should support */
type BridgeActionRecord<T extends XAction> = Record<
  `${BridgeActionNames}Actions`,
  T[]
>

export type BridgeDevice<T extends XAction = XAction> = {
  id: string
  name: string
} & BridgeActionRecord<T>

export type NewDevice<T extends XAction> = {
  name: string
} & Partial<BridgeActionRecord<T>>

/** A mapped collection of information retrieved from the bridges api. */
export type BridgeInfo = {
  name: string
  modelId: string
  bridgeId: string
  gateway: string
  macAddress: string
  ipAddress: string
  version: {
    api: string
    software: string
  }
  time: {
    zone: string
    utc: Date
    local: Date
  }
}

/** Defines the mapper fn that bindings should utilize if transformation is needed */
export type FnMapBridgeInfo<Response extends PrimitiveObject> = (
  response: Response
) => BridgeInfo

/** Collect to manipulate bridge devices */
export type BridgeDevices<T extends XAction> = {
  /** Gets a device by ID */
  get(id: string): Promise<BridgeDevice<T>>
  /** Registers new bridge device. */
  create(device: NewDevice<T>): Promise<BridgeDevice<T>>
  /** Fetches a device by ID, updates the Device using a **shallow** merge */
  update(
    id: string,
    updateData: Partial<NewDevice<T>>
  ): Promise<BridgeDevice<T>>
  /** Deletes item by ID */
  delete(id: string): Promise<void>
}

export type Bridge<T extends XAction> = {
  getInfo(): Promise<BridgeInfo>
  device: BridgeDevices<T>
}
