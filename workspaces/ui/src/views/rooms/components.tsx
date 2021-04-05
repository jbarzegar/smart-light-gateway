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
