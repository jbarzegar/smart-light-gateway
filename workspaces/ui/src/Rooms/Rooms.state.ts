import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

export type Room = {
  id: string
  name: string
  description?: string
  /** Contains a collection of `Device` ids to map `Device` entities via another selector */
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
    createMany: adapter.addMany,
    remove: adapter.removeOne,
  },
})
