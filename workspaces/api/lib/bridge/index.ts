import { Bridge, BridgeBindings, XAction } from './types'

/** Instantiates a bridge instance utilizing the bindings provided in order to trigger real world effects */
type FnCreateBridgeInstance = <Actions extends XAction>(
  bindings: BridgeBindings<Actions>
) => Bridge<Actions>

/** Instantiates a bridge instance utilizing the bindings provided in order to trigger real world effects */
export const createBridgeInstance: FnCreateBridgeInstance = bindings => {
  return {
    getInfo: bindings.getInfo,
    device: {
      get: bindings.getDevice,
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
