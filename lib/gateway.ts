import { Light } from "./light";
import { DiscoverClient } from "./discoverClient";

export type Discoverer = DiscoverClient<Light>;

interface IGateway {
  discover(): Promise<Light[]>;
}

export class Gateway implements IGateway {
  private discoverer: Discoverer;
  constructor(client: Discoverer) {
    this.discoverer = client;
  }
  async discover(): Promise<Light[]> {
    const lights = await this.discoverer.discoverAllLights();
    return lights;
  }
}
