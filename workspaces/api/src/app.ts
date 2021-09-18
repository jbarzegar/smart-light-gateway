import { flow } from 'lodash'
import api from './api'
import initLightActions from './actions/lights'
import { createBridgeInstance } from '@lib/bridge'
import * as HaBridge from '@lib/bridge/bindings/ha-bridge'

import { Gateway } from '@lib/gateway'
import { MockClient } from '@lib/clients'

type ApiConf = Parameters<typeof api>[0]

const Client = new MockClient()
const getLightActions = flow(
  () => Client,
  client => new Gateway(client),
  gateway => initLightActions(gateway)
)

const devConf: ApiConf = { actions: { getLightActions } }

api(devConf)

const bridge = createBridgeInstance(
  HaBridge.bindings({ apiUrl: 'http://localhost:8080' })
)

// bridge.device.create()
const item = Client.discoverAllLights()
  .then(x => x[0])
  .then(device =>
    bridge.device.create({
      name: device.name || 'unknownDevice',
      onActions: [{ name: 'SET_POWER', payload: 'on' }],
      offActions: [{ name: 'SET_POWER', payload: 'off' }],
      dimActions: [{ name: 'SET_BRIGHTNESS', payload: '${device.intensity}' }],
      colorActions: [
        {
          name: 'SET_COLOR',
          payload: { r: '${color.r}', g: '${color.g}', b: '${color.b}' },
        },
      ],
    })
  )
