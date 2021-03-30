import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Heading,
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

import { AddForm, EmptyState, TableHead, TableItem } from './components'

type RoomStates = 'hasRooms' | 'empty'

const calcRoomState = (arr: any[]): RoomStates =>
  arr.length === 0 ? 'empty' : 'hasRooms'

export const RoomsView = () => {
  const rooms = useSelector(selectAll)
  const dispatch = useDispatch()
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
      <Drawer
        size="sm"
        isOpen={addingRoom}
        onClose={() => setAddingRoom(false)}
      >
        <DrawerOverlay>
          <DrawerContent>
            <AddForm
              onAdd={data => {
                console.log(data)
                dispatch(
                  actions.create({
                    ...data,
                    attachedDeviceIds: data.attachedDeviceIds as string[],
                  })
                )
                setAddingRoom(false)
              }}
            />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Container>
  )
}
