import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { isEnv } from 'utils'

import * as devices from 'Devices/Devices.state'
import * as rooms from 'Rooms/Rooms.state'

const reducer = {
  [devices.name]: devices.reducer,
  [rooms.name]: rooms.reducer,
}
export const createStore = (preloadedState?: PreloadedState<typeof reducer>) =>
  configureStore({
    reducer,
    devTools: isEnv('development'),
    middleware: middleWare => middleWare().concat(logger),
    preloadedState,
  })

export type State = ReturnType<ReturnType<typeof createStore>['getState']>
