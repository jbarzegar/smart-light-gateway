import {
  createSlice,
  createEntityAdapter,
  CaseReducer,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit'
import { mapNewRoom } from './Rooms.mapper'

export type Room = {
  id: string
  name: string
  description?: string
  /** Contains a collection of `Device` ids to map `Device` entities via another selector */
  attachedDeviceIds: string[]
}

export type NewRoom = Omit<Room, 'id'>

type FnReducer<P> = CaseReducer<EntityState<Room>, PayloadAction<P>>

export const adapter = createEntityAdapter<Room>({
  selectId: x => x.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const createMany: FnReducer<NewRoom[]> = (state, { payload }) =>
  adapter.addMany(state, payload.map(mapNewRoom))

const create: FnReducer<NewRoom> = (state, { payload }) =>
  adapter.addOne(state, mapNewRoom(payload))

export const { actions, reducer, name } = createSlice({
  name: 'rooms',
  initialState: adapter.getInitialState(),
  reducers: {
    create,
    createMany,
    remove: adapter.removeOne,
  },
})
