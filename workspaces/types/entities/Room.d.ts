import type { ID } from '../util'

export type Room = {
  readonly id: ID
  name: string
  description?: string
  /** Contains a collection of `Device` ids to map `Device` entities via another selector */
  attachedDeviceIds: string[]
}
export type NewRoom = Omit<Room, 'id'>
