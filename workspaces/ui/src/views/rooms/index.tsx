import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Heading,
  Box,
  Container,
  Table,
  Tbody,
  HStack,
  Button,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'

import { actions } from 'core/rooms/state'
import { selectAll } from 'core/rooms/selectors'

import { AddForm } from './forms/AddForm'
import { EmptyState, TableHead, TableItem } from './components'

type RoomStates = 'hasRooms' | 'empty'

const calcRoomState = (arr: any[]): RoomStates =>
  arr.length === 0 ? 'empty' : 'hasRooms'

type NewRoomDrawerProps = { open: boolean; onClose(): void }
const NewRoomDrawer = (props: NewRoomDrawerProps) => {
  const { open, onClose } = props
  const dispatch = useDispatch()

  return (
    <Drawer size="sm" isOpen={open} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <Box overflowY="auto">
            <AddForm
              onAdd={data => {
                dispatch(
                  actions.create({
                    ...data,
                    attachedDeviceIds: data.attachedDeviceIds as string[],
                  })
                )
                onClose()
              }}
            />
          </Box>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export const RoomsView = () => {
  const rooms = useSelector(selectAll)
  const [roomState, setRoomState] = useState<RoomStates>(calcRoomState(rooms))
  const [addingRoom, setAddingRoom] = useState(false)

  useEffect(() => {
    setRoomState(calcRoomState(rooms))
  }, [rooms])

  return (
    <Container maxW="container.lg" py={'12'}>
      <HStack align="center" justify="space-between" mb={'24'}>
        <Flex>
          <Heading as="h2">Rooms</Heading>
        </Flex>
        {roomState === 'hasRooms' && (
          <Button leftIcon={<MdAdd />} onClick={() => setAddingRoom(true)}>
            Add Room
          </Button>
        )}
      </HStack>
      {roomState === 'empty' && (
        <EmptyState onAdd={() => setAddingRoom(true)} />
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
      <NewRoomDrawer onClose={() => setAddingRoom(false)} open={addingRoom} />
    </Container>
  )
}
