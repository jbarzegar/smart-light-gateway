import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { isEnv } from 'utils'

import * as devices from './devices/slice'
import * as rooms from './rooms/slice'

const isDev = isEnv('development')

export const store = configureStore({
  reducer: {
    [devices.name]: devices.reducer,
    [rooms.name]: rooms.reducer,
  },
  devTools: isDev,
  middleware: middleWare => middleWare().concat(logger),
})

export type State = ReturnType<typeof store.getState>

declare const window: Window & { store: typeof store }
if (isDev) {
  window.store = store
}
