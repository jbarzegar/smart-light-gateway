import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { BaseLight } from '@gateway/types/entities'

type Light = {
  type: 'light'
} & BaseLight

export type Device = Light

export const adapter = createEntityAdapter<Device>({
  selectId: x => x.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id),
})

export const { actions, name, reducer } = createSlice({
  name: 'devices',
  initialState: adapter.getInitialState(),
  reducers: {
    add: adapter.addOne,
    remove: adapter.removeOne,
    hydrate: adapter.addMany,
  },
})
