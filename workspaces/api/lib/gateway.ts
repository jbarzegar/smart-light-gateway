import { Light } from './entities'
import { DiscoverClient } from '@gateway/types'

export type Discoverer = DiscoverClient<Light>

interface IGateway {
  discover(): Promise<Light[]>
}

export class Gateway implements IGateway {
  private discoverer: Discoverer
  constructor(discoverer: Discoverer) {
    this.discoverer = discoverer
  }
  /** A non persistent connection that returns all lights on network */
  async discover(): Promise<Light[]> {
    const lights = await this.discoverer.discoverAllLights()

    return lights
  }
}
