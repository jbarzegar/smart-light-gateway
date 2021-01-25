import { createBridgeSync } from '../lib/ha-bridge-sync'

const TEST_URL = 'http://localhost:8080'

const validPayload = {
  name: 'device',
  offUrl:
    '[{"item":"http://localhost:100/${device.description}","type":"httpDevice","httpVerb":"POST","httpBody":"{ \\"action\\": \\"SET_POWER\\", \\"payload\\": \\"off\\" }","contentType":"application/json"}]',
  dimUrl:
    '[{"item":"http://localhost:100/${device.description}","type":"httpDevice","httpVerb":"POST","httpBody":"{\\n  \\"action\\": \\"SET_BRIGHTNESS\\",\\n  \\"payload\\": ${colorbri} \\n}","contentType":"application/json"}]',
  onUrl:
    '[{"item":"http://localhost:100/${device.description}","type":"httpDevice","httpVerb":"POST","httpBody":"{ \\"action\\": \\"SET_POWER\\", \\"payload\\": \\"on\\" }","contentType":"application/json"}]',
  colorUrl:
    '[{"item":"http://localhost:100/${device.description}","httpVerb":"POST","httpBody":"{ \\n  \\"action\\": \\"SET_COLOR\\", \\n  \\"payload\\": { \\"r\\": ${color.r}, \\"g\\": ${color.g}, \\"b\\": ${color.b} \\n}","contentType":"application/json","type":"httpDevice"}]',
  description: 'f50edd33-a701-48d3-ac56-03a4cd3f2ede',
}

const item = [
  {
    item: 'http://localhost:100/${device.description}',
    type: 'httpDevice',
    httpVerb: 'POST',
    httpBody: { action: 'SET_POWER', payload: 'off' },
    contentType: 'application/json',
  },
]

describe('ha-bridge sync', () => {
  it('should connect to', async () => {
    const expectedApiVersion = '1.17.0'
    const expectedName = 'HA-Bridge'

    const bridge = createBridgeSync('http://localhost:8080')
    const info = await bridge.getInfo()
    expect(info.version.api).toEqual(expectedApiVersion)
    expect(info.name).toEqual(expectedName)
  })

  it.todo('should create a new device')
  it.todo('should update an existing device')
  it.todo('should delete an existing device')
  it.todo('should be able to resync with new/fragmented ha-bridge instance')
})
