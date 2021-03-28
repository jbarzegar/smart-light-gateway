import { NewRoom, Room } from './Rooms.state'
import { nanoid } from '@reduxjs/toolkit'

export const mapNewRoom = (payload: NewRoom): Room => ({
  ...payload,
  id: nanoid(),
})
