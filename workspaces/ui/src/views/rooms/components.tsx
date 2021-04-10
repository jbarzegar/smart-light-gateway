import { useDispatch } from 'react-redux'
import {
  Heading,
  Thead,
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
} from '@chakra-ui/react'
import { MdEdit, MdDelete, MdRoundedCorner, MdAdd } from 'react-icons/md'
import { actions, Room } from 'core/rooms/state'
import { useRoomViewContext } from './viewContext'

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
  const { colorMode } = useColorMode()
  const { editRoom } = useRoomViewContext()

  const handleDeleteClick = (id: string) => () => dispatch(actions.remove(id))

  return (
    <Tr>
      <Td fontWeight="bold">{room.name}</Td>
      <Td color={colorMode === 'dark' ? 'whiteAlpha.400' : 'gray.400'}>
        {room.description || 'No description'}
      </Td>
      <Td>{room.attachedDeviceIds.length}</Td>
      <HStack as={Td} spacing={10} justify="flex-end" isNumeric>
        <IconButton
          icon={<MdEdit />}
          aria-label="Edit room"
          onClick={() => editRoom(room)}
        />
        <IconButton
          icon={<MdDelete />}
          aria-label="Delete room"
          onClick={handleDeleteClick(room.id)}
        />
      </HStack>
    </Tr>
  )
}

export const EmptyState = (props: { onAdd(): void }) => {
  const { colorMode } = useColorMode()
  return (
    <VStack
      p="8"
      boxShadow="base"
      direction="column"
      borderRadius="base"
      bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
    >
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
  )
}
