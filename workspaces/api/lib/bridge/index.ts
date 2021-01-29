import { Bridge, BridgeBindings } from './types'

type FnCreateBridgeSync = (bindings: BridgeBindings) => Bridge
export const createBridgeSync: FnCreateBridgeSync = bindings => {
  const { getInfo, createLight } = bindings
  return {
    getInfo,
    device: { create: createLight },
  }
}
