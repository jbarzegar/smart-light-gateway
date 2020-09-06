import api from './api'
import initLightActions from './actions/lights'
import { Gateway } from '@lib/gateway'

import { MockClient } from '@lib/discoverClient/__mock'

const lightClient = new MockClient()
const gateway = new Gateway(lightClient)

type ApiConf = Parameters<typeof api>[0]

const devConf: ApiConf = {
  actions: {
    getLightActions: () => initLightActions(gateway),
  },
}

api(devConf)
