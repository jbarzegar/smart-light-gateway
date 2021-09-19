import { LightClientDisconnected } from './entities'
import { DiscoverClient } from '@gateway/types'

export type Discoverer = DiscoverClient<LightClientDisconnected>

interface IGateway {
  discover(): Promise<LightClientDisconnected[]>
}

export class Gateway implements IGateway {
  private discoverer: Discoverer
  constructor(discoverer: Discoverer) {
    this.discoverer = discoverer
  }
  /** A non persistent connection that returns all lights on network */
  async discover(): Promise<LightClientDisconnected[]> {
    const lights = await this.discoverer.discoverAllLights()

    return lights
  }
}
