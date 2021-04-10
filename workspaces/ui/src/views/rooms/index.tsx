import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Heading,
  Box,
  Container,
  Table,
  Tbody,
  HStack,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'
import {
  RoomViewContextProvider,
  useRoomViewContext,
  useHydrateRooms,
  RoomViewStates,
} from './viewContext'

import { selectAll } from 'core/rooms/selectors'
import { BasicDrawer } from 'components/BasicDrawer'

import { AddForm } from './forms/AddForm'
import { EmptyState, TableHead, TableItem } from './components'

type RoomStates = 'hasRooms' | 'empty'

const calcRoomState = (arr: any[]): RoomStates =>
  arr.length === 0 ? 'empty' : 'hasRooms'

type NewRoomDrawerProps = { open: boolean; onClose(): void }
const NewRoomDrawer = (props: NewRoomDrawerProps) => {
  const { open, onClose } = props
  const { viewState } = useRoomViewContext()

  const heading = `${
    viewState === RoomViewStates.editingRoom ? 'Editing' : 'Creating'
  } Room`
  return (
    <BasicDrawer heading={heading} size="lg" open={open} onClose={onClose}>
      <Box overflowY="auto">
        <AddForm onAdded={onClose} />
      </Box>
    </BasicDrawer>
  )
}

const RoomViewRoot = () => {
  const rooms = useSelector(selectAll)
  const { status } = useHydrateRooms()
  const { viewState, cleanupRoom } = useRoomViewContext()
  const [roomDrawerOpen, setRoomDrawerOpen] = useState(false)
  const [roomState, setRoomState] = useState<RoomStates>(calcRoomState(rooms))

  useEffect(() => {
    setRoomState(calcRoomState(rooms))
  }, [rooms])

  useEffect(() => {
    if (viewState === RoomViewStates.editingRoom) {
      setRoomDrawerOpen(true)
    }
  }, [viewState])

  if (status === 'loading') return <Spinner />

  return (
    <Container maxW="container.lg" py={'12'}>
      <HStack align="center" justify="space-between" mb={'24'}>
        <Heading as="h2">Rooms</Heading>
        {roomState === 'hasRooms' && (
          <Button
            leftIcon={<MdAdd aria-label="add icon" />}
            onClick={() => setRoomDrawerOpen(true)}
          >
            Add Room
          </Button>
        )}
      </HStack>
      {roomState === 'empty' && (
        <EmptyState onAdd={() => setRoomDrawerOpen(true)} />
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
      <NewRoomDrawer
        onClose={() => {
          setRoomDrawerOpen(false)
          cleanupRoom()
        }}
        open={roomDrawerOpen}
      />
    </Container>
  )
}

export const RoomsView = () => {
  return (
    <RoomViewContextProvider>
      <RoomViewRoot />
    </RoomViewContextProvider>
  )
}
