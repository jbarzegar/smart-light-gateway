import { State } from 'global/store'
import { adapter } from './Devices.state'

export const {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors<State>(s => s.devices)
