import { NewRoom, Room } from './state'
import { nanoid } from '@reduxjs/toolkit'

export const mapNewRoom = (payload: NewRoom): Room => ({
  ...payload,
  id: nanoid(),
})
