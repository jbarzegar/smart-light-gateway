import * as React from 'react'
import createStore from 'zustand'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import {
  Box,
  Flex,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/core'
import { CardGrid } from 'components/CardGrid'
import { LightCard } from 'components/LightCard'
import { Container } from 'components/Container'
import { random, uniqueId, startCase } from 'lodash'

type Room = {
  id: string
  name: string
  description?: string
  devices: { name: string }[]
}

type State = {
  rooms: Room[]
  createRoom(room: Omit<Room, 'devices' | 'id'>): void
}

const withLocalSync = (key: string, payload: any) => {
  localStorage.setItem(key, JSON.stringify(payload))
  return payload
}

const getRooms = (): Room[] => {
  const cache = localStorage.getItem('cachedRooms')
  return !cache ? [] : JSON.parse(cache)
}

const useRoomStore = createStore<State>(set => ({
  rooms: getRooms(),
  createRoom: (room: Omit<Room, 'devices' | 'id'>) =>
    set(state => ({
      rooms: withLocalSync('cachedRooms', [
        ...state.rooms,
        {
          ...room,
          name: startCase(room.name),
          id: uniqueId('light'),
          devices: makeLights(random(2, 10)),
        },
      ]),
    })),
}))

const makeLights = (len = 5) =>
  new Array(len).fill(null).map((_, i) => ({ name: `mocked-light-${i}` }))

const ViewHeading = ({ children }: React.PropsWithChildren<{}>) => (
  <Heading fontSize="6xl" textTransform="uppercase">
    {children}
  </Heading>
)

const AllRooms = () => {
  const rooms = useRoomStore(x => x.rooms)

  const history = useHistory()
  const match = useRouteMatch()

  if (!rooms.length) {
    return (
      <>
        <ViewHeading>No Rooms were found</ViewHeading>

        <Box mx="auto">
          <Button
            leftIcon="add"
            variant="outline"
            size="lg"
            onClick={() => history.push(`${match.path}/new`)}
          >
            Create a room now
          </Button>
        </Box>
      </>
    )
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <ViewHeading>All Rooms</ViewHeading>
        <Button
          leftIcon="add"
          variant="ghost"
          size="lg"
          onClick={() => history.push(`${match.path}/new`)}
        >
          Create room
        </Button>
      </Flex>

      {rooms.map((room, i) => (
        <Box key={room.id}>
          <Heading fontSize="4xl" py={8} color="gray.700">
            {room.name}{' '}
            <Box as="span" color="gray.900" opacity={0.3}>
              {i + 1}/{rooms.length}
            </Box>
          </Heading>

          <CardGrid>
            {room.devices.map(device => (
              <LightCard
                key={device.name}
                isLoaded
                onPowerBtnClick={() => {}}
                light={{
                  host: '0000',
                  id: 'asdf',
                  name: device.name,
                  port: '324',
                  status: 'on',
                  type: 'light',
                }}
              />
            ))}
          </CardGrid>
        </Box>
      ))}
    </>
  )
}

const NewRoom = () => {
  const createRoom = useRoomStore(_ => _.createRoom)
  const [name, setName] = React.useState<string>('')
  const history = useHistory()

  return (
    <>
      <ViewHeading>New Room</ViewHeading>

      <form
        onSubmit={e => {
          e.preventDefault()
          console.log(name)
          createRoom({ name })
          history.replace('/rooms')
        }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Room Name</FormLabel>
          <Input
            id="name"
            type="text"
            name="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.currentTarget.value)
            }
          ></Input>
        </FormControl>

        <Button mt={4} variant="solid" bg="black" color="white" type="submit">
          Create room
        </Button>
      </form>
    </>
  )
}

export const RoomView = () => {
  const match = useRouteMatch()

  return (
    <Container>
      <Switch>
        <Route exact path={match.path} component={AllRooms}></Route>
        <Route exact path={`${match.path}/new`} component={NewRoom}></Route>
      </Switch>
    </Container>
  )
}
