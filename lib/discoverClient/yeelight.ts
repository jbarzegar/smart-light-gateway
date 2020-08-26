import { pick } from "lodash";
import { Discover, Yeelight, Color } from "yeelight-awesome";
import * as _Color from "color";

import { DiscoverClient } from ".";
import { Light } from "../light";

const toRGB = (hex: string) => {
  // @ts-ignore
  const rgb: [number, number, number] = new _Color(hex).rgb().toJSON().color;

  return new Color(...rgb);
};

export class YeelightDiscoveryClient implements DiscoverClient<Light> {
  private discoverer: Discover;
  constructor() {
    this.discoverer = new Discover({});
  }
  async discoverAllLights() {
    const devices = (await this.discoverer.start()).filter(Boolean);
    const keys = ["id", "host", "port", "name"];

    const lights: Light[] = devices.map((_) => ({
      ...pick(_, keys),
      connectionStatus: "disconnected",
      connect: async () => {
        const light = new Yeelight({
          lightId: _.id,
          lightIp: _.host,
          lightPort: _.port,
        });

        const l = await light.connect();

        return {
          ...pick(_, keys),
          name: _.name,
          setBrightness: (intensity, options) =>
            l.setBright(intensity, options.transition, options.timing),
          setColor: (color, options) =>
            l.setRGB(toRGB(color), options.transition, options.timing),
          setPower: (status, opts) =>
            l.setPower(status === "on", opts.transition, opts.timing),
          connectionStatus: l.connected ? "connected" : "disconnected",
          disconnect: () => l.disconnect(),
        };
      },
    }));

    return lights;
  }
  async cleanup() {
    await this.discoverer.destroy();
    return;
  }
}
