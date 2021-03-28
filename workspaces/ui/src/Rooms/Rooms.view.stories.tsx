import { Meta, Story } from '@storybook/react'

import { actions } from './Rooms.state'
import { Rooms } from './Rooms.view'
import { createStore } from 'global/store'
import { withStore } from '../../.storybook/decorators'

export default {
  title: 'Domains/Rooms',
  component: Rooms,
} as Meta

const createWithRoomStore = () => {
  const s = createStore()

  const roomData = [
    { name: 'Living room' },
    { name: 'Bedroom' },
    { name: 'Bathroom' },
    { name: 'Upstairs office', description: 'Office way in the back' },
  ].map(x => ({ ...x, attachedDeviceIds: [] }))

  s.dispatch(actions.createMany(roomData))

  return s
}

const Template = () => <Rooms />

export const WithRooms: Story = Template.bind({})
WithRooms.decorators = [withStore(createWithRoomStore())]

export const WithoutRooms: Story = Template.bind({})
WithoutRooms.decorators = [withStore(createStore())]
