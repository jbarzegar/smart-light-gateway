import { Discover, Yeelight, Color } from 'yeelight-awesome'
import * as _Color from 'color'

import { DiscoverClient } from '.'
import Light from '@lib/entities/lights'

const toRGB = (hex: string) => {
  // @ts-ignore
  const rgb: [number, number, number] = new _Color(hex).rgb().toJSON().color

  return new Color(...rgb)
}

export class YeelightDiscoveryClient implements DiscoverClient<Light> {
  private discoverer: Discover
  constructor() {
    this.discoverer = new Discover({})
  }
  async discoverAllLights() {
    const devices = (await this.discoverer.start()).filter(Boolean)
    const lights: Light[] = devices.map(_ => ({
      host: _.host,
      id: _.id,
      port: _.port,
      name: _.name || 'unknownYeelight',
      status: _.status as any,
      connect: async () => {
        const light = new Yeelight({
          lightId: _.id,
          lightIp: _.host,
          lightPort: _.port,
        })

        const l = await light.connect()

        return {
          id: _.id,
          host: _.host,
          port: _.port,
          name: _?.name,
          status: _.status,
          getStatus: () => _.status,
          setBrightness: async (intensity, options) => {
            await l.setBright(intensity, options.transition, options.timing)
          },
          setColor: async (color, options) => {
            await l.setRGB(toRGB(color), options.transition, options.timing)
          },
          setPower: async (status, opts) => {
            await l.setPower(status === 'on', opts.transition, opts.timing)
          },
          disconnect: async () => {
            await l.disconnect()
          },
        }
      },
    }))

    return lights
  }
  cleanup() {
    return this.discoverer.destroy()
  }
}
