import { getInfo } from './bindings/ha-bridge'
import { FnCreateBridgeSync } from './types'

export const createBridgeSync: FnCreateBridgeSync = url => {
  return {
    getInfo: getInfo(url),
    devices: { create: async device => device },
  }
}
