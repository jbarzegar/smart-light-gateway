import { LightClientDisconnected } from './entities'
import { DiscoverClient } from '@gateway/types'
import { Bridge } from '@lib/bridge/types'

export type Discoverer = DiscoverClient<LightClientDisconnected>

interface IGateway {
  /** trigger a scan for new devices */
  discover(): Promise<LightClientDisconnected[]>
  /** sync devices with bridge service */
  syncBridge(): Promise<unknown>
}

export class Gateway implements IGateway {
  private discoverer: Discoverer
  private bridge: Bridge
  constructor(discoverer: Discoverer, bridge: Bridge) {
    this.discoverer = discoverer
    this.bridge = bridge
  }
  syncBridge(): Promise<unknown> {
    throw new Error('Method not implemented.')
  }
  /** A non persistent connection that returns all lights on network */
  async discover(): Promise<LightClientDisconnected[]> {
    const lights = await this.discoverer.discoverAllLights()

    return lights
  }
}
