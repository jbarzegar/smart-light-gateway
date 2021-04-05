import { Device } from 'core/devices/state'
import { Box, Heading, Text, Icon, VStack } from '@chakra-ui/react'
import { MdLightbulbOutline } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

const deviceIcon: Record<Device['type'], IconType> = {
  light: MdLightbulbOutline,
}

const getIcon = (x: keyof typeof deviceIcon) =>
  deviceIcon?.[x] && <Icon as={deviceIcon[x]} boxSize="12" />

type DeviceCardProps = { device: Device }
export const DeviceCard = ({ device }: DeviceCardProps) => (
  <VStack px="8" pt="8" minH="xs" boxShadow="md" alignItems="flex-start">
    <Heading
      as="h4"
      fontSize="3xl"
      fontWeight="medium"
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      {getIcon(device.type)}
      <span>{device.name}</span>
    </Heading>
    <Box pl="12">
      <Text>Type: {device.type}</Text>
      <Text>
        {device.host}:{device.port}
      </Text>
      <Text>Status: {device.status}</Text>
    </Box>
  </VStack>
)
