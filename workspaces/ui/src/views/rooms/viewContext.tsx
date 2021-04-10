import {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from 'react'
import { Room } from '@gateway/types'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { actions } from 'core/rooms/state'
import {
  GetAllRoomsResponse,
  getAllRooms,
  createRoom,
  updateRoom,
} from 'api/rooms'

export enum RoomViewStates {
  idle,
  displayingRooms,
  emptyRoom,
  editingRoom,
}

type FnCleanupEdit = () => void
type RoomViewContext = {
  viewState: RoomViewStates
  roomEditData: Room | undefined
  /** Returns function to clean up editing */
  editRoom(room: Room): FnCleanupEdit
  cleanupRoom: FnCleanupEdit
}

const viewContext = createContext<RoomViewContext>({} as RoomViewContext)

type RoomViewContextProviderProps = PropsWithChildren<{
  initialState?: Partial<Pick<RoomViewContext, 'viewState'>>
}>
export const RoomViewContextProvider = (
  props: RoomViewContextProviderProps
) => {
  const [viewState, setViewState] = useState<RoomViewStates>(
    props.initialState?.viewState || RoomViewStates.idle
  )
  const [tmpRoom, setTmpRoom] = useState<Room | undefined>(undefined)

  const cleanupRoom = () => {
    setViewState(RoomViewStates.idle)
    setTmpRoom(undefined)
  }

  const editRoom = useCallback((room: Room) => {
    setTmpRoom(room)
    setViewState(RoomViewStates.editingRoom)
    return cleanupRoom
  }, [])

  return (
    <viewContext.Provider
      value={{
        viewState,
        roomEditData: tmpRoom,
        cleanupRoom,
        editRoom,
      }}
    >
      {props.children}
    </viewContext.Provider>
  )
}

export const useRoomViewContext = () => useContext(viewContext)

export const useCreateRoomHandler = () => {
  const dispatch = useDispatch()
  const mutation = useMutation('createRoom', createRoom, {
    onSuccess(data) {
      const payload = {
        ...data,
        attachedDeviceIds: data.attachedDeviceIds as string[],
      }
      dispatch(actions.create(payload))
    },
  })

  return mutation
}

export const useUpdateRoomHandler = () => {
  const dispatch = useDispatch()
  const mutation = useMutation('updateRoom', updateRoom, {
    onSuccess(data) {
      const payload = {
        ...data,
        attachedDeviceIds: data.attachedDeviceIds as string[],
      }
      dispatch(actions.update(payload))
    },
  })

  return mutation
}

export const useHydrateRooms = () => {
  const dispatch = useDispatch()
  const query = useQuery<GetAllRoomsResponse>('allRooms', getAllRooms, {
    onSuccess: ({ response }) => dispatch(actions.hydrate(response.data)),
  })

  return query
}

export const addFormSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  attachedDeviceIds: yup.array(yup.string()).optional().default([]),
})
export type AddFormSchema = yup.InferType<typeof addFormSchema>

export const useAddRoomForm = (defaultValues?: Partial<AddFormSchema>) =>
  useForm<AddFormSchema>({
    resolver: yupResolver(addFormSchema),
    defaultValues,
  })
