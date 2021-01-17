import { Discover } from 'yeelight-awesome'
import { Light } from '@gateway/types/entities'
import { DiscoverClient } from '@gateway/types/discoverClient'
import { mapLight } from './mappers'

export class YeelightDiscoveryClient implements DiscoverClient<Light> {
  private discoverer: Discover
  constructor() {
    this.discoverer = new Discover({})
  }
  async discoverAllLights() {
    const devices = (await this.discoverer.start()).filter(Boolean)
    const lights: Light[] = devices.map(_ => mapLight(_))

    return lights
  }
  cleanup() {
    return this.discoverer.destroy()
  }
}
