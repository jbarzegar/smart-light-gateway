import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import {
  Button,
  SimpleGrid,
  Flex,
  VStack,
  Heading,
  Box,
  useColorMode,
  Text,
  Collapse,
} from '@chakra-ui/react'
import { MdClearAll } from 'react-icons/md'
import { isEmpty } from 'lodash'
import { Device } from 'core/devices'
import { selectAll as selectAllDevices } from 'core/devices/selectors'

type DeviceCardProps = {
  device: Device
  onClick(): void
  deviceIncluded: boolean
}
const DeviceCard = ({ device, onClick, deviceIncluded }: DeviceCardProps) => {
  const { colorMode } = useColorMode()

  return (
    <VStack
      role="button"
      tabIndex={0}
      onClick={onClick}
      sx={{
        px: '8',
        py: '8',
        boxShadow: 'md',
        cursor: 'pointer',
        transition: 'background ease 0.3s',

        '&:focus': { boxShadow: 'lg' },
        ...(colorMode === 'light'
          ? {
              bg: deviceIncluded ? 'gray.100' : 'white',
              '&:hover': {
                bg: 'gray.200',
              },
              '&:active': {
                bg: 'gray.300',
              },
            }
          : {
              bg: deviceIncluded ? 'gray.800' : 'gray.700',
              '&:hover': {
                bg: 'gray.500',
              },
              '&:active': {
                bg: 'gray.900',
              },
            }),
      }}
    >
      <Heading as="h5" fontSize="lg" m="0">
        {device.name}
      </Heading>
    </VStack>
  )
}

type AttachDeviceProps = {
  onDeviceAttachment(id: string): void
  onDeviceDetach(id: string): void
}
export const AttachDevice = ({
  onDeviceAttachment,
  onDeviceDetach,
}: AttachDeviceProps) => {
  const allDevices = useSelector(selectAllDevices)
  const [deviceIds, setDeviceIds] = useState<string[]>([])
  const [deviceValue, setDeviceValue] = useState<string>()
  const [shouldAttachDevice, setShouldAttachDevice] = useState(false)
  const [state, setState] = useState<
    'addingDevice' | 'removingDevice' | 'idle'
  >('idle')

  useEffect(() => {
    switch (state) {
      case 'addingDevice':
        if (deviceValue) {
          setDeviceIds(
            t => Array.from(new Set([...t, deviceValue])) as string[]
          )
          onDeviceAttachment(deviceValue)
        }
        break
      case 'removingDevice':
        setDeviceIds(t => t.filter(x => x !== deviceValue))
        onDeviceDetach(deviceValue || '')
        break
    }

    if (state !== 'idle' && !!deviceValue) {
      setState('idle')
      setDeviceValue(undefined)
    }
  }, [state, deviceValue, onDeviceAttachment, onDeviceDetach])

  if (isEmpty(allDevices)) {
    return (
      <Flex align="center" justifyContent="space-between">
        <Text>No devices to attach</Text>
        <Button disabled>Add a device here</Button>
      </Flex>
    )
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" mb={'8'}>
        <Text
          fontSize="xl"
          fontWeight="semibold"
          onClick={() => setShouldAttachDevice(!shouldAttachDevice)}
        >
          Attach Device(s)
        </Text>
        {shouldAttachDevice && (
          <Box>
            <Button
              leftIcon={<MdClearAll />}
              disabled={isEmpty(deviceIds)}
              onClick={() => setDeviceIds([])}
            >
              Detach all devices
            </Button>
          </Box>
        )}
      </Flex>
      <Collapse in={shouldAttachDevice} animateOpacity>
        <SimpleGrid columns={2} spacing={10}>
          {allDevices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              deviceIncluded={deviceIds.includes(device.id)}
              onClick={() => {
                setDeviceValue(device.id)
                if (deviceIds.includes(device.id)) {
                  setState('removingDevice')
                } else {
                  setState('addingDevice')
                }
              }}
            />
          ))}
        </SimpleGrid>
      </Collapse>
    </>
  )
}
