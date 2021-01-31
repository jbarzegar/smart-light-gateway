import { createBridgeInstance } from '../lib/bridge'
import {
  XAction,
  FnCreateBindings,
  FnCreateDevice,
  BridgeDevice,
  BridgeInfo,
} from '../lib/bridge/types'
import { nanoid as genId } from 'nanoid'

type MockDeviceActions =
  | XAction<'SET_POWER', 'off' | 'on'>
  | XAction<'SET_COLOR', Record<'r' | 'g' | 'b', string>>
  | XAction<'SET_BRIGHTNESS', string>

const mockInfo: BridgeInfo = {
  bridgeId: genId(),
  gateway: 'asdf',
  ipAddress: 'asdf',
  macAddress: 'asdf',
  modelId: genId(),
  name: 'asdf',
  time: {
    local: new Date(),
    utc: new Date(new Date().toUTCString()),
    zone: 'America/Toronto',
  },
  version: {
    api: '0',
    software: '0',
  },
}

type MockDeps = Partial<{
  verbose: boolean
  shouldFail: boolean
}>
type MockDevice = BridgeDevice<MockDeviceActions>

const setupMockBindings: FnCreateBindings<MockDeps, MockDeviceActions> = (
  deps = {}
) => {
  const { shouldFail = false, verbose = false } = deps

  let devices: Record<string, MockDevice> = {}

  return {
    async getDevice(id) {
      const device = devices[id]

      if (!device) throw new Error(`could not get device with id of: ${id}`)

      return device
    },
    async createDevice(device) {
      const id = genId()
      const data: MockDevice = {
        id,
        name: device.name,
        colorActions: device.colorActions,
        dimActions: device.dimActions,
        offActions: device.offActions,
        onActions: device.onActions,
      }

      devices[id] = data

      if (verbose) {
        console.log('[createLight] created new device: ', devices)
      }

      return data
    },
    async updateDevice(id, data) {
      const l = devices[id]

      if (!l) throw new Error(`could not find device with id: ${id}`)

      const updatedLight: MockDevice = { ...l, ...data }

      devices[id] = updatedLight

      return updatedLight
    },
    async deleteDevice() {
      return { deleted: !shouldFail }
    },
    getInfo: async () => mockInfo,
  }
}

describe('bridge interface', () => {
  const setupTest = () => {
    const bridge = createBridgeInstance(setupMockBindings({}))

    return { bridge }
  }

  it('should get info', async () => {
    const { version, name: expectedName } = mockInfo
    const expectedApiVersion = version.api

    const { bridge } = setupTest()

    const info = await bridge.getInfo()
    expect(info.version.api).toEqual(expectedApiVersion)
    expect(info.name).toEqual(expectedName)
  })

  it.todo('should be able to resync with new/fragmented ha-bridge instance')

  describe('device management', () => {
    const [deviceParams]: Parameters<FnCreateDevice<MockDeviceActions>> = [
      {
        name: 'butts',
        onActions: [{ name: 'SET_POWER', payload: 'on' }],
        offActions: [{ name: 'SET_POWER', payload: 'off' }],
        dimActions: [
          { name: 'SET_BRIGHTNESS', payload: '${device.intensity}' },
        ],
        colorActions: [
          {
            name: 'SET_COLOR',
            payload: { r: '${color.r}', g: '${color.g}', b: '${color.b}' },
          },
        ],
      },
    ]

    it('should create a new device', async () => {
      const { bridge } = setupTest()
      const spy = jest.spyOn(bridge.device, 'create')

      const device = await bridge.device.create(deviceParams)

      expect(spy).toHaveBeenCalledWith(deviceParams)
      // We should get back an id of some sort
      expect(typeof device.id).toBe('string')
      expect(device.name).toMatch(deviceParams.name)
    })
    it('should fetch a device', async () => {
      const { bridge } = setupTest()
      const { id, name } = await bridge.device.create(deviceParams)

      const spy = jest.spyOn(bridge.device, 'get')

      const device = await bridge.device.get(id)

      expect(spy).toHaveBeenCalledWith(id)
      // We should get back an id of some sort
      expect(device.id).toMatch(id)
      expect(device.name).toMatch(name)
    })

    it('should update an existing device', async () => {
      const { bridge } = setupTest()
      const { id, name } = await bridge.device.create(deviceParams)

      const spy = jest.spyOn(bridge.device, 'update')
      const updateData = { name: 'cool updated thingy' }
      const device = await bridge.device.update(id, updateData)

      expect(spy).toHaveBeenCalledWith(id, updateData)
      expect(device.id).toMatch(id)
      expect(device.name).toMatch(updateData.name)
    })

    it('should delete an existing device', async () => {
      const { bridge } = setupTest()
      const { id } = await bridge.device.create(deviceParams)

      const spy = jest.spyOn(bridge.device, 'delete')

      await bridge.device.delete(id)

      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).not.toThrowError()
    })
  })
})
