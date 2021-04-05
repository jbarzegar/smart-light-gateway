import { Store } from 'redux'
import { mockLights } from '@gateway/clients/mock/data'
import { StateProvider } from 'global/Providers'
import { createStore } from 'global/store'
import { compose } from '@reduxjs/toolkit'
import { actions as roomActions } from 'core/rooms/state'

import { actions as deviceActions } from 'core/devices/state'

export const createWithRoomStore = (s = createStore()) => {
  const roomData = [
    { name: 'Living room' },
    { name: 'Bedroom' },
    { name: 'Bathroom' },
    { name: 'Upstairs office', description: 'Office way in the back' },
  ].map(x => ({ ...x, attachedDeviceIds: [] }))

  s.dispatch(roomActions.createMany(roomData))

  return s
}

export const storeWithDevices = (store = createStore()) => {
  const payload = deviceActions.hydrate(
    mockLights.map(x => ({ ...x, type: 'light' }))
  )
  store.dispatch(payload)

  return store
}

export const withStore = (store: Store) => (Story: Function) => {
  return (
    <StateProvider store={store}>
      <Story />
    </StateProvider>
  )
}

export const withEmptyStore = () => withStore(createStore())

export const withFullAppState = () =>
  withStore(compose(createWithRoomStore, storeWithDevices)())

export const withRoomStore = () => withStore(createWithRoomStore())
export const withDeviceStore = () => withStore(storeWithDevices())
