import { Room } from '@gateway/types'
import { nanoid } from '@reduxjs/toolkit'

const delay = () =>
  new Promise(resolve => setTimeout(() => resolve(undefined), 2000))

const mockRooms = [
  { name: 'Living room' },
  { name: 'Bedroom' },
  { name: 'Bathroom' },
  { name: 'Upstairs office', description: 'Office way in the back' },
].map(x => ({ ...x, attachedDeviceIds: [] }))

interface ApiResponse<Data> {
  code: number
  response: {
    resourceId?: string
    data: Data
  }
}

export type GetAllRoomsResponse = ApiResponse<Room[]>
export const getAllRooms = async (): Promise<GetAllRoomsResponse> => {
  await delay()

  return {
    code: 200,
    response: {
      resourceId: 'allRooms',
      data: mockRooms.map(x => ({ ...x, id: nanoid() })),
    },
  }
}

export const createRoom = async (variables: {
  name: string
  description: string | undefined
  attachedDeviceIds: string[]
}) => {
  await delay()

  return variables
}

export const updateRoom = async (variables: {
  id: string
  name: string
  description: string | undefined
  attachedDeviceIds: string[]
}) => {
  await delay()

  return variables
}
