import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import {
  Heading,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Box,
  Icon,
  Button,
  VStack,
  useColorMode,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react'
import {
  MdEdit,
  MdDelete,
  MdRoundedCorner,
  MdAdd,
  MdArrowBack,
} from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { selectAll } from './Rooms.selectors'
import { actions, Room } from './Rooms.state'

const TableHead = () => (
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Description</Th>
      <Th isNumeric>Actions</Th>
    </Tr>
  </Thead>
)

const TableItem = (room: Room) => {
  const dispatch = useDispatch()
  const handleDeleteClick = (id: string) => () => dispatch(actions.remove(id))

  return (
    <Tr>
      <Td>{room.name}</Td>
      <Td>{room.description || 'No description'}</Td>
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

const EmptyState = (props: { onAdd(): void }) => {
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

const addFormSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
})
type AddFormSchema = yup.InferType<typeof addFormSchema>

const AddForm = (props: { onBack(): void }) => {
  const { register, handleSubmit, errors } = useForm<AddFormSchema>({
    resolver: yupResolver(addFormSchema),
  })
  const dispatch = useDispatch()

  return (
    <form
      onSubmit={handleSubmit(data => {
        dispatch(
          actions.create({ ...data, id: nanoid(), attachedDeviceIds: [] })
        )
        props.onBack()
      })}
    >
      <IconButton
        onClick={props.onBack}
        icon={<MdArrowBack />}
        aria-label="Go back"
      ></IconButton>
      <FormControl>
        <FormLabel htmlFor="description">Room name</FormLabel>
        <Input name="name" ref={register({ required: true })} />
        {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Room description (optional)</FormLabel>
        <Input name="description" ref={register()}></Input>
        {errors.description && (
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        )}
      </FormControl>

      <Button type="submit">Create</Button>
    </form>
  )
}

type RoomStates = 'hasRooms' | 'empty' | 'addingRoom'

const calcRoomState = (arr: any[]): RoomStates =>
  arr.length === 0 ? 'empty' : 'hasRooms'

export const Rooms = () => {
  const rooms = useSelector(selectAll)
  const [roomState, setRoomState] = useState<RoomStates>(calcRoomState(rooms))

  useEffect(() => {
    setRoomState(calcRoomState(rooms))
  }, [rooms])

  return (
    <Container maxW="container.lg" py={'12'}>
      <Heading as="h2" mb={'24'}>
        Rooms
      </Heading>
      {roomState === 'empty' && (
        <EmptyState
          onAdd={() => {
            setRoomState('addingRoom')
          }}
        />
      )}
      {roomState === 'hasRooms' && (
        <Table>
          <TableHead />
          <Tbody>
            {rooms.map(room => (
              <TableItem key={room.id} {...room} />
            ))}
          </Tbody>
        </Table>
      )}
      {roomState === 'addingRoom' && (
        <AddForm onBack={() => setRoomState(calcRoomState(rooms))} />
      )}
    </Container>
  )
}
