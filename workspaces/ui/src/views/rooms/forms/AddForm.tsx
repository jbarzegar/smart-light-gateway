import { useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AttachDevice } from './AttachDevice'

const addFormSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  attachedDeviceIds: yup.array(yup.string()).optional().default([]),
})
type AddFormSchema = yup.InferType<typeof addFormSchema>

export const AddForm = (props: { onAdd(data: AddFormSchema): void }) => {
  const { register, handleSubmit, errors } = useForm<AddFormSchema>({
    resolver: yupResolver(addFormSchema),
  })
  const [attachedDeviceIds, setAttachedDeviceIds] = useState<string[]>([])

  return (
    <>
      <DrawerCloseButton />
      <DrawerHeader>Add new Room</DrawerHeader>
      <form
        onSubmit={handleSubmit(d => props.onAdd({ ...d, attachedDeviceIds }))}
      >
        <DrawerBody>
          <FormControl mb="4">
            <FormLabel htmlFor="description">Room name</FormLabel>
            <Input name="name" ref={register({ required: true })} />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
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
            onDeviceDetach={id =>
              setAttachedDeviceIds(arr => arr.filter(x => id !== x))
            }
            onDeviceAttachment={deviceId =>
              setAttachedDeviceIds(arr =>
                Array.from(new Set([...arr, deviceId]))
              )
            }
          />
        </DrawerBody>

        <DrawerFooter>
          <Button type="submit" mt={'4'}>
            Create
          </Button>
        </DrawerFooter>
      </form>
    </>
  )
}
