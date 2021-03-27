import { State } from 'state/store'
import { adapter } from './slice'

export const {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors<State>(x => x.rooms)
