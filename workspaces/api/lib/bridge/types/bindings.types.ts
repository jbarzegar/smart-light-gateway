import { PrimitiveObject } from '@gateway/types/util'
import { XAction, BridgeInfo, NewDevice, BridgeDevice } from './bridge.types'

/** To bind to the standard bridge interface. */
export type BridgeBindings<T extends XAction> = {
  getInfo(): Promise<BridgeInfo>
  getDevice(id: string): Promise<BridgeDevice<T>>
  createDevice(device: NewDevice<T>): Promise<BridgeDevice<T>>
  updateDevice(
    id: string,
    update: Partial<NewDevice<T>>
  ): Promise<BridgeDevice<T>>
  deleteDevice(id: string): Promise<{ deleted: boolean }>
}

/** Creates a bridge instance for a client to interact with  */
export type FnCreateBindings<
  Deps extends PrimitiveObject | undefined,
  Actions extends XAction
> = Deps extends undefined
  ? () => BridgeBindings<Actions>
  : (deps: Deps) => BridgeBindings<Actions>

export type FnCreateDevice<T extends XAction> = (
  device: NewDevice<T>
) => Promise<unknown>
