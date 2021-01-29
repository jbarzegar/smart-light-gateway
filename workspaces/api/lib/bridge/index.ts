import { BridgeInfo, BridgeDevices } from './types'
import { getInfo } from './bindings/ha-bridge'

type Bridge = {
  getInfo(): Promise<BridgeInfo>
  devices: BridgeDevices
}

type FnCreateBridgeSync = (url: string) => Bridge
export const createBridgeSync: FnCreateBridgeSync = url => {
  return {
    getInfo: getInfo(url),
    devices: { create: async device => device },
  }
}
