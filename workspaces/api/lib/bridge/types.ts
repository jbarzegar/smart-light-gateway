type PrimitiveObject<V = any, K extends string | number = string | number> = {
  [Key in K]: V
}

/** Defines an action that can be sent from the bridge to our api */
export type XAction<A extends string = string, P extends any = any> = {
  name: A
  payload: P
}

export type ActionNames = 'on' | 'off' | 'dim' | 'color'

/** Defines possible actions that the bridge can/should support */
type BridgeActionRecord<T extends XAction> = Record<
  `${ActionNames}Actions`,
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

/** To bind to the standard bridge interface. */
export type BridgeBindings<T extends XAction> = {
  getInfo(): Promise<BridgeInfo>
  // getDevice<T extends XAction>(id: string): Promise<BridgeDevice<T>>
  createDevice(device: NewDevice<T>): Promise<BridgeDevice<T>>
  updateDevice(
    id: string,
    update: Partial<NewDevice<T>>
  ): Promise<BridgeDevice<T>>
  deleteDevice(id: string): Promise<{ deleted: boolean }>
}

/** Creates a bridge instance for a client to interact with  */
export type FnCreateBindings<
  Deps extends PrimitiveObject | undefined = undefined,
  Actions extends XAction = XAction
> = Deps extends undefined
  ? () => BridgeBindings<Actions>
  : (deps: Deps) => BridgeBindings<Actions>

export type FnCreateDevice<T extends XAction> = (
  device: NewDevice<T>
) => Promise<unknown>

/** Collect to manipulate bridge devices */
export type BridgeDevices = {
  // get<T extends XAction = XAction>(id: string): Promise<BridgeDevice<T>>
  /** Registers new bridge device. */
  create<T extends XAction>(device: NewDevice<T>): Promise<BridgeDevice<T>>
  update<T extends XAction>(
    id: string,
    updateData: Partial<NewDevice<T>>
  ): Promise<BridgeDevice<T>>
  delete(id: string): Promise<void>
}

export type Bridge = {
  getInfo(): Promise<BridgeInfo>
  device: BridgeDevices
}
