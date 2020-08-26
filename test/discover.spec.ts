import { Gateway, Discoverer } from "../lib/gateway";
import { YeelightDiscoveryClient } from "../lib/discoverClient/yeelight";

describe("#discovery", () => {
  async function testDiscovery(client: Discoverer) {
    const gateway = new Gateway(client);
    const lights = await gateway.discover();

    expect(Array.isArray(lights)).toBe(true);

    const expectedShape = ["id", "host", "port", "name"];
    expect(Object.keys(lights[0])).toEqual(expectedShape);

    return await client.cleanup();
  }
  test("discover all lights using client", async () => {
    const mockClient = {
      cleanup: () => Promise.resolve(),
      discoverAllLights: async () => [{ id: "", host: "", port: 1, name: "" }],
    };

    await testDiscovery(mockClient);
  });

  test("discover all yeelights", async () => {
    const yeelightDiscover = new YeelightDiscoveryClient();

    await testDiscovery(yeelightDiscover);
  });
});
