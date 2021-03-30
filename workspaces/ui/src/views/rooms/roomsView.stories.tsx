import { Meta, Story } from '@storybook/react'
import { RoomsView } from '.'
import { createStore } from 'global/store'
import {
  withStore,
  withRoomStore,
  withFullAppState,
} from '.storybook/decorators'

export default {
  title: 'Views/Rooms',
  component: RoomsView,
} as Meta

const Template = () => <RoomsView />

export const WithRooms: Story = Template.bind({})
WithRooms.decorators = [withRoomStore()]

export const WithoutRooms: Story = Template.bind({})
WithoutRooms.decorators = [withStore(createStore())]

export const WithExistingDevices: Story = Template.bind({})
WithExistingDevices.decorators = [withFullAppState()]
