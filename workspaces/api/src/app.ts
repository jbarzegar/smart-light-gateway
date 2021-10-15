import { flow } from 'lodash'
import api from './api'
import { createDeviceController } from '@lib/device-controller'
import { createBridgeInstance } from '@lib/bridge'
import * as HaBridge from '@lib/bridge/bindings/ha-bridge'

import { Gateway } from '@lib/gateway'
import { MockClient } from '@lib/clients'

type ApiConf = Parameters<typeof api>[0]

const haBridgeBindings = HaBridge.bindings({ apiUrl: 'http://localhost:8000' })
const bridge = createBridgeInstance(haBridgeBindings)

const lightActions = flow(
  client => new Gateway(client, bridge),
  gateway => createDeviceController(gateway)
)(new MockClient())

const getLightActions = () => lightActions

const devConf: ApiConf = { actions: { getLightActions } }

api(devConf)

// bridge.device.create()
// const item = Client.discoverAllLights()
//   .then(x => x[0])
//   .then(device =>
//     bridge.device.create({
//       name: device.name || 'unknownDevice',
//       onActions: [{ name: 'SET_POWER', payload: 'on' }],
//       offActions: [{ name: 'SET_POWER', payload: 'off' }],
//       dimActions: [{ name: 'SET_BRIGHTNESS', payload: '${device.intensity}' }],
//       colorActions: [
//         {
//           name: 'SET_COLOR',
//           payload: { r: '${color.r}', g: '${color.g}', b: '${color.b}' },
//         },
//       ],
//     })
//   )
//.then(console.log)

const main = async () => {
  const x = await bridge.device.getAll()
  const l = await lightActions.getAllLights()

  console.log(x)
}
