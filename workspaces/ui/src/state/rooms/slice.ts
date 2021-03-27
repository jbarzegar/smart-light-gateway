import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

type Room = {
  id: string
  name: string
  description?: string
  /** A list of attachedDeviceIds */
  attachedDeviceIds: string[]
}

export const adapter = createEntityAdapter<Room>({
  selectId: x => x.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const { actions, reducer, name } = createSlice({
  name: 'rooms',
  initialState: adapter.getInitialState(),
  reducers: {
    create: adapter.addOne,
  },
})
