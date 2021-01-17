import { Yeelight, IDevice } from 'yeelight-awesome'
import * as _Color from 'color'
import { pick } from 'lodash'

import { Light } from '@gateway/types/entities'
import { toRGB } from './util'

const devicePickKeys = ['host', 'id', 'port', 'status'] as const

type FnCreateConnect = (device: IDevice) => Light['connect']
const createConnect: FnCreateConnect = device => async () => {
  const light = new Yeelight({
    lightId: device.id,
    lightIp: device.host,
    lightPort: device.port,
  })

  const l = await light.connect()

  return {
    ...pick(device, [...devicePickKeys, 'name']),
    getStatus: () => device.status,
    setBrightness: async (intensity, options) => {
      await l.setBright(intensity, options.transition, options.timing)
    },
    setColor: async (color, options) => {
      await l.setRGB(toRGB(color), options.transition, options.timing)
    },
    setPower: async (status, opts) => {
      try {
        await l.setPower(status === 'on', opts.transition, opts.timing)
      } catch (e) {
        throw e
      }
    },
    disconnect: async () => {
      await l.disconnect()
    },
  }
}

type FnMapLight = (device: IDevice) => Light
export const mapLight: FnMapLight = device => ({
  ...pick(device, devicePickKeys),
  name: device.name || 'unknownYeelight',
  connect: createConnect(device),
})
