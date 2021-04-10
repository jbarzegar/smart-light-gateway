import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import {
  Button,
  SimpleGrid,
  Flex,
  VStack,
  Heading,
  useColorMode,
  Text,
} from '@chakra-ui/react'
import { isEmpty } from 'lodash'

import { BasicDrawer } from 'components/BasicDrawer'
import { Device } from 'core/devices'
import { selectAll as selectAllDevices } from 'core/devices/selectors'
import { useRoomViewContext, RoomViewStates } from '../viewContext'

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

type AttachDeviceStates = 'addingDevice' | 'removingDevice' | 'idle'
type AttachDeviceProps = {
  initialDevices?: string[]
  onDeviceAttachment(id: string): void
  onDeviceDetach(id: string): void
}
export const AttachDevice = ({
  onDeviceDetach,
  onDeviceAttachment,
  initialDevices = [],
}: AttachDeviceProps) => {
  const allDevices = useSelector(selectAllDevices)
  const { viewState } = useRoomViewContext()
  const [deviceIds, setDeviceIds] = useState<string[]>(initialDevices)
  const [deviceValue, setDeviceValue] = useState<string>()
  const [shouldAttachDevice, setShouldAttachDevice] = useState(false)
  const [state, setState] = useState<AttachDeviceStates>('idle')

  useEffect(() => {
    if (!isEmpty(initialDevices) && viewState === RoomViewStates.editingRoom) {
      setDeviceIds(initialDevices)
    }
  }, [initialDevices, setDeviceIds, viewState])

  useEffect(() => {
    const handler: Record<typeof state, () => void> = {
      addingDevice() {
        if (deviceValue) {
          setDeviceIds(
            t => Array.from(new Set([...t, deviceValue])) as string[]
          )
          onDeviceAttachment(deviceValue)
        }
      },
      idle: () => {},
      removingDevice() {
        setDeviceIds(t => t.filter(x => x !== deviceValue))
        onDeviceDetach(deviceValue || '')
      },
    }

    handler[state]()

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
        <Button
          variant="solid"
          colorScheme="purple"
          onClick={() => setShouldAttachDevice(true)}
        >
          Attach Device(s)
        </Button>
      </Flex>
      <BasicDrawer
        size="sm"
        open={shouldAttachDevice}
        heading="Attach Devices(s)"
        onClose={() => setShouldAttachDevice(false)}
      >
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
      </BasicDrawer>
    </>
  )
}
