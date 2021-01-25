import { Gateway, Discoverer } from '../lib/gateway'
import { MockClient } from '../lib/clients'

describe('#discovery', () => {
  async function testPower(status: 'on' | 'off') {
    const client = new MockClient()
    const gateway = new Gateway(client)

    const devices = await gateway.discover()

    const connectedDevices = await Promise.all(devices.map(l => l.connect()))

    await Promise.all(
      connectedDevices.map(l =>
        l.setPower(status, {
          timing: 300,
          transition: 'smooth',
        })
      )
    )

    await client.cleanup()
  }
  async function testDiscovery(client: Discoverer) {
    const gateway = new Gateway(client)
    const lights = await gateway.discover()

    expect(Array.isArray(lights)).toBe(true)

    return await client.cleanup()
  }
  test('discover all lights using client', async () => {
    await testDiscovery(new MockClient())
  })

  // Move these into light actions test
  test('turn all lights off', async () => {
    await testPower('off')
  })

  test('turn all lights on', async () => {
    await testPower('on')
  })
})
