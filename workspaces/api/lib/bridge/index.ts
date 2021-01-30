import { Bridge, BridgeBindings } from './types'

type FnCreateBridgeSync = (bindings: BridgeBindings) => Bridge
export const createBridgeSync: FnCreateBridgeSync = bindings => {
  return {
    getInfo: bindings.getInfo,
    device: {
      create: bindings.createDevice,
      update: bindings.updateDevice,
      delete: async (...args) => {
        try {
          await bindings.deleteDevice(...args)
          return
        } catch (e) {
          throw e
        }
      },
    },
  }
}
