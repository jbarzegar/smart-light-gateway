import { Gateway, Discoverer } from "../lib/gateway";
import { YeelightDiscoveryClient } from "../lib/discoverClient/yeelight";

describe("#discovery", () => {
  async function testDiscovery(client: Discoverer) {
    const gateway = new Gateway(client);
    const lights = await gateway.discover();

    expect(Array.isArray(lights)).toBe(true);

    const expectedShape = ["id", "host", "port", "name", "connect"];
    // expect(Object.keys(lights[0])).toContainEqual(expectedShape);

    return await client.cleanup();
  }
  test("discover all lights using client", async () => {
    const mockClient: Discoverer = {
      cleanup: () => Promise.resolve(),
      // @ts-ignore
      discoverAllLights: async () => [
        {
          id: "",
          host: "",
          port: 1,
          name: "",
          connect: async () => ({
            id: "",
            host: "",
            port: 1,
            name: "",
            disconnect: async () => {},
            setBrightness: async () => ({
              action: "",
              command: "",
              result: "",
              success: true,
            }),
            setColor: async () => ({
              action: "",
              command: "",
              result: "",
              success: true,
            }),
            setPower: async () => ({
              action: "",
              command: "",
              result: "",
              success: true,
            }),
          }),
        },
      ],
    };

    await testDiscovery(mockClient);
  });

  test("discover all yeelights", async () => {
    const yeelightDiscover = new YeelightDiscoveryClient();

    await testDiscovery(yeelightDiscover);
  });

  test.skip("turn all lights off", async () => {
    const client = new YeelightDiscoveryClient();
    const gateway = new Gateway(client);

    const devices = await gateway.discover();

    const connectedDevices = await Promise.all(devices.map((l) => l.connect()));

    connectedDevices.forEach((_) => console.log(_.getStatus()));

    await Promise.all(
      connectedDevices.map((l) =>
        l.setPower("off", {
          timing: 300,
          transition: "smooth",
        })
      )
    );

    connectedDevices.forEach((_) => console.log(_.getStatus()));
    await client.cleanup();
  });
});
