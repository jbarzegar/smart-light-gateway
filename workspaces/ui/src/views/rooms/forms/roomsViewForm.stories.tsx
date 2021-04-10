import { Meta, Story } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Box } from '@chakra-ui/react'
import { BasicDrawer } from 'components/BasicDrawer'
import { AttachDevice } from './AttachDevice'
import { AddForm as AddFormComp } from './AddForm'
import { default as viewStory } from '../roomsView.stories'
import { withDeviceStore, withEmptyStore } from '.storybook/decorators'

export default {
  title: `${viewStory.title}/Forms`,
} as Meta

const Template = () => {
  return (
    <BasicDrawer size="lg" open onClose={action('closing')}>
      <Box overflowY="auto" sx={{ scrollPadding: '8px' }}>
        <AttachDevice
          onDeviceDetach={action('Device Detached')}
          onDeviceAttachment={action('Device Attached')}
        />
      </Box>
    </BasicDrawer>
  )
}

export const AttachDeviceForm: Story = Template.bind({})
AttachDeviceForm.decorators = [withDeviceStore()]

export const AttachDeviceFormEmpty: Story = Template.bind({})
AttachDeviceFormEmpty.decorators = [withEmptyStore()]

export const AddForm: Story = () => (
  <BasicDrawer size="lg" open heading="asdf" onClose={action('Closing Form')}>
    <AddFormComp onAdded={action('Creating room')} />
  </BasicDrawer>
)
AddForm.decorators = [withEmptyStore()]
