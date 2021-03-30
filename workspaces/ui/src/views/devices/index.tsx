import { useSelector } from 'react-redux'
import { selectAll as selectAllDevices } from 'core/devices/selectors'
import { Device } from 'core/devices/state'
import { Box, Heading, Text, Icon, SimpleGrid, VStack } from '@chakra-ui/react'
import { MdLightbulbOutline } from 'react-icons/md'
import { IconType } from 'react-icons/lib'

const deviceIcon: Record<Device['type'], IconType> = {
  light: MdLightbulbOutline,
}

type DeviceCardProps = { device: Device }
const DeviceCard = (props: DeviceCardProps) => {
  const { device } = props
  return (
    <VStack px="8" pt="8" minH="xs" boxShadow="md" alignItems="flex-start">
      <Heading
        as="h4"
        fontSize="3xl"
        fontWeight="medium"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        {deviceIcon?.[device.type] && (
          <Icon as={deviceIcon?.[device.type]} boxSize="12" />
        )}
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
}

export const DevicesView = () => {
  const devices = useSelector(selectAllDevices)

  return (
    <SimpleGrid columns={4} spacing="8">
      {devices.map(device => (
        <DeviceCard device={device} key={device.id} />
      ))}
    </SimpleGrid>
  )
}
