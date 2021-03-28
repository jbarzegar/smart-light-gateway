import { State } from 'global/store'
import { adapter } from './Rooms.state'

export const {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors<State>(x => x.rooms)
