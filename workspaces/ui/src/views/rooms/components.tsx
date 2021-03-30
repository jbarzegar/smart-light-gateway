import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {
  Heading,
  Thead,
  Tr,
  Th,
  Td,
  IconButton,
  List,
  ListItem,
  HStack,
  Box,
  Icon,
  Text,
  Button,
  Select,
  VStack,
  useColorMode,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { MdEdit, MdDelete, MdRoundedCorner, MdAdd } from 'react-icons/md'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { actions, Room } from 'core/rooms/state'
import { selectAll as selectAllDevices } from 'core/devices/selectors'
import { useEffect } from 'react'
import { useCallback } from 'react'

const addFormSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  attachedDeviceIds: yup.array(yup.string()).optional().default([]),
})
type AddFormSchema = yup.InferType<typeof addFormSchema>

const AddDevice = ({
  onDeviceAttachment,
  onDeviceDetach,
}: {
  onDeviceAttachment: (id: string) => void
  onDeviceDetach: (id: string) => void
}) => {
  const allDevices = useSelector(selectAllDevices)
  const [deviceIds, setDeviceIds] = useState<string[]>([])
  const [deviceValue, setDeviceValue] = useState<string>()
  const [state, setState] = useState<'addingDevice' | 'idle'>('idle')

  useEffect(() => {
    if (state === 'addingDevice') {
      if (deviceValue) onDeviceAttachment(deviceValue)

      setState('idle')
      setDeviceValue(undefined)
    }
  }, [state, deviceValue, onDeviceAttachment])

  return (
    <>
      {deviceIds.length > 0 ? (
        <Box>
          <Text>Attached Devices</Text>
          <List>
            {deviceIds.map(x => (
              <ListItem key={x}>
                <Text>{x}</Text>
                <IconButton
                  aria-label="Remove device"
                  icon={<MdDelete />}
                  onClick={() => {
                    setDeviceIds(s => s.filter(_ => x !== _))
                    onDeviceDetach(x)
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}

      <Box>
        <Text>Attach device(s) to room</Text>
        <Select
          onChange={e => {
            setDeviceValue(e.currentTarget.value)
          }}
          placeholder="Select a device"
        >
          {allDevices
            .filter(device => !deviceIds.includes(device.id))
            .map(device => (
              <option key={device.id} value={device.id}>
                {device.name}
              </option>
            ))}
        </Select>

        <Button
          mt={'4'}
          onClick={() => {
            if (deviceValue) {
              setDeviceIds(
                t => Array.from(new Set([...t, deviceValue])) as string[]
              )
              setState('addingDevice')
            }
          }}
        >
          Add device
        </Button>
      </Box>
    </>
  )
}

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

          <AddDevice
            onDeviceDetach={id =>
              setAttachedDeviceIds(arr => arr.filter(x => x !== id))
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

export const TableHead = () => (
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Description</Th>
      <Th># Of devices</Th>
      <Th isNumeric>Actions</Th>
    </Tr>
  </Thead>
)

export const TableItem = (room: Room) => {
  const dispatch = useDispatch()
  const handleDeleteClick = (id: string) => () => dispatch(actions.remove(id))
  const { colorMode } = useColorMode()

  return (
    <Tr>
      <Td fontWeight="bold">{room.name}</Td>
      <Td color={colorMode === 'dark' ? 'whiteAlpha.400' : 'gray.400'}>
        {room.description || 'No description'}
      </Td>
      <Td>{room.attachedDeviceIds.length}</Td>
      <Td isNumeric>
        <HStack spacing={10} justify="flex-end">
          <IconButton icon={<MdEdit />} aria-label="Edit room" />
          <IconButton
            icon={<MdDelete />}
            aria-label="Delete room"
            onClick={handleDeleteClick(room.id)}
          />
        </HStack>
      </Td>
    </Tr>
  )
}

export const EmptyState = (props: { onAdd(): void }) => {
  const { colorMode } = useColorMode()
  return (
    <Box
      p="8"
      boxShadow="base"
      borderRadius="base"
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
    >
      <VStack direction="column">
        <Icon as={MdRoundedCorner} boxSize="sm" />
        <Box>
          <Heading as="h3" mb="8">
            You have no rooms
          </Heading>
          <Button leftIcon={<MdAdd />} colorScheme="gray" onClick={props.onAdd}>
            Add new room
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
