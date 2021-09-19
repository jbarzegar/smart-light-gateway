import { Light } from '@gateway/types'

type MappedDevice = Light & {
  bridgeId: string
}

const DeviceMap = new Map<string, MappedDevice>()
interface IDeviceManager {}
class DeviceManager implements IDeviceManager {}
