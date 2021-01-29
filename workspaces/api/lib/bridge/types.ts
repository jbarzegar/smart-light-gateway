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

export type BridgeDevice<T extends XAction> = {
  id: string
  name: string
} & BridgeActionRecord<T>

export type NewDevice<T extends XAction> = {
  name: string
} & Partial<BridgeActionRecord<T>>

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
export type FnMapBridgeInfo<Response extends { [key: string]: any }> = (
  response: Response
) => BridgeInfo

export type BridgeBindings = {
  getInfo(): Promise<BridgeInfo>
  createLight<T extends XAction>(device: NewDevice<T>): Promise<unknown>
  updateLight<T extends XAction>(
    id: string,
    update: Partial<NewDevice<T>>
  ): Promise<unknown>
  deleteLight(id: string): Promise<void>
}

type BridgeDeps = { apiUrl: string }
export type FnCreateBindings = (deps: BridgeDeps) => BridgeBindings

export type BridgeDevices = {
  create<T extends XAction>(device: NewDevice<T>): Promise<unknown>
}

export type Bridge = {
  getInfo(): Promise<BridgeInfo>
  device: BridgeDevices
}
