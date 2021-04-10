import { useSelector } from 'react-redux'
import { SimpleGrid } from '@chakra-ui/react'

import { DeviceCard } from 'components/DeviceCard'
import { selectAll as selectAllDevices } from 'core/devices/selectors'

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
