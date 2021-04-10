import { createSlice, createEntityAdapter, EntityId } from '@reduxjs/toolkit'
import { EntityReducers, FnEntityReducer } from 'global/types'
import { mapNewRoom } from './mappers'

export type Room = {
  id: string
  name: string
  description?: string
  /** Contains a collection of `Device` ids to map `Device` entities via another selector */
  attachedDeviceIds: string[]
}
export type NewRoom = Omit<Room, 'id'>

type RoomReducer<P> = FnEntityReducer<Room, P>

export const adapter = createEntityAdapter<Room>({
  selectId: x => x.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

type RoomReducers = EntityReducers<Room> & {
  create: RoomReducer<NewRoom>
  createMany: RoomReducer<NewRoom[]>
  remove: RoomReducer<EntityId>
  update: RoomReducer<Room>
  hydrate: RoomReducer<Room[]>
}
const reducers: RoomReducers = {
  create: (state, { payload }) => adapter.addOne(state, mapNewRoom(payload)),
  createMany: (state, { payload }) =>
    adapter.addMany(state, payload.map(mapNewRoom)),
  remove: adapter.removeOne,
  hydrate: adapter.setAll,
  update: (state, { payload }) =>
    adapter.updateOne(state, { id: payload.id, changes: payload }),
}

export const { actions: sliceActions, reducer, name } = createSlice({
  name: 'rooms',
  initialState: adapter.getInitialState(),
  reducers,
})

export const actions = {
  ...sliceActions,
}
