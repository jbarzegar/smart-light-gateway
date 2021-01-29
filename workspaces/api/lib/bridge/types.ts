export type Bridge = {
  getInfo(): Promise<BridgeInfo>
  devices: BridgeDevices
}

export type XAction<A extends string = string, P extends any = any> = {
  name: A
  payload: P
}

type NewDevice<T extends XAction> = {
  name: string
} & Partial<Record<`${ActionNames}Actions`, T[]>>

export interface BridgeDevices {
  create<T extends XAction>(device: NewDevice<T>): Promise<unknown>
}

export type FnCreateBridgeSync = (url: string) => Bridge

export type FnGetInfo = (url: string) => () => Promise<BridgeInfo>

export type FnMapBridgeInfo<Response extends { [key: string]: any }> = (
  response: Response
) => BridgeInfo

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

export type ActionNames = 'on' | 'off' | 'dim' | 'color'
