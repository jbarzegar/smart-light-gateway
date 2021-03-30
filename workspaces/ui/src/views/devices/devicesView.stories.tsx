import { Story, Meta } from '@storybook/react'
import { DevicesView } from '.'

import { withDeviceStore } from '.storybook/decorators'

export default {
  title: 'Views/Devices',
} as Meta

export const Mounted: Story = () => <DevicesView />
Mounted.decorators = [withDeviceStore()]
