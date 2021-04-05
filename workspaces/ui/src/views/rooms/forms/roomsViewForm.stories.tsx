import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Drawer, DrawerOverlay, DrawerContent, Box } from '@chakra-ui/react'
import { default as viewStory } from '../roomsView.stories'
import { withDeviceStore, withEmptyStore } from '.storybook/decorators'
import { AttachDevice } from './AttachDevice'
import { AddForm as AddFormComp } from './AddForm'

export default {
  title: `${viewStory.title}/Forms`,
} as Meta

const Template = () => {
  return (
    <Drawer size="sm" isOpen onClose={action('closing')}>
      <DrawerOverlay>
        <DrawerContent p={'8'}>
          <Box overflowY="auto" sx={{ scrollPadding: '8px' }}>
            <AttachDevice
              onDeviceAttachment={action('Device Attached')}
              onDeviceDetach={action('Device Detached')}
            />
          </Box>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export const AttachDeviceForm: Story = Template.bind({})
AttachDeviceForm.decorators = [withDeviceStore()]

export const AttachDeviceFormEmpty: Story = Template.bind({})
AttachDeviceFormEmpty.decorators = [withEmptyStore()]

export const AddForm: Story = () => (
  <Drawer size="sm" isOpen onClose={action('Closing Form')}>
    <DrawerOverlay>
      <DrawerContent p={'8'}>
        <AddFormComp onAdd={action('Creating room')} />
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
)
AddForm.decorators = [withEmptyStore()]
