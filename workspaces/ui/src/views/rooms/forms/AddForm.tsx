import { useState, useEffect, useCallback } from 'react'
import { MutationStatus } from 'react-query'
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  DrawerBody,
  DrawerFooter,
  Spinner,
} from '@chakra-ui/react'

import { AttachDevice } from './AttachDevice'
import {
  useRoomViewContext,
  RoomViewStates,
  useCreateRoomHandler,
  useUpdateRoomHandler,
  AddFormSchema,
  useAddRoomForm,
} from '../viewContext'
import { deDupeArray } from 'utils'

export const AddForm = ({ onAdded }: { onAdded(): void }) => {
  const createRoom = useCreateRoomHandler()
  const updateRoom = useUpdateRoomHandler()

  const mutationIs = useCallback(
    (status: MutationStatus) =>
      [createRoom.status, updateRoom.status].some(x => x === status),
    [createRoom.status, updateRoom.status]
  )

  const { roomEditData, viewState } = useRoomViewContext()

  const { register, handleSubmit, errors } = useAddRoomForm({
    name: roomEditData?.name,
    description: roomEditData?.description,
  })
  const [attachedDeviceIds, setAttachedDeviceIds] = useState<string[]>([])

  useEffect(() => {
    if (mutationIs('success')) onAdded()
  }, [onAdded, mutationIs])

  const isEditing = viewState === RoomViewStates.editingRoom

  const onSubmit = (data: AddFormSchema) => {
    const payload = { ...data, attachedDeviceIds }

    if (isEditing && roomEditData)
      updateRoom.mutate({ id: roomEditData.id, ...payload })
    else createRoom.mutate(payload)
  }

  useEffect(() => {
    if (roomEditData?.attachedDeviceIds && isEditing) {
      setAttachedDeviceIds(roomEditData.attachedDeviceIds)
    }
    return () => setAttachedDeviceIds([])
  }, [roomEditData, isEditing])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mutationIs('loading') ? (
          <Spinner />
        ) : (
          <>
            <DrawerBody>
              <FormControl mb="4">
                <FormLabel htmlFor="description">Room name</FormLabel>
                <Input
                  autoFocus
                  name="name"
                  ref={register({ required: true })}
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mb="4">
                <FormLabel htmlFor="description">
                  Room description (optional)
                </FormLabel>
                <Input name="description" ref={register()}></Input>
                {errors.description && (
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                )}
              </FormControl>

              <AttachDevice
                initialDevices={attachedDeviceIds}
                onDeviceDetach={id =>
                  setAttachedDeviceIds(arr => arr.filter(x => id !== x))
                }
                onDeviceAttachment={deviceId =>
                  setAttachedDeviceIds(arr => deDupeArray([...arr, deviceId]))
                }
              />
            </DrawerBody>

            <DrawerFooter>
              <Button type="submit" mt={'4'}>
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </DrawerFooter>
          </>
        )}
      </form>
    </>
  )
}
