import { flow } from 'lodash'
import api from './api'
import initLightActions from './actions/lights'

import { Gateway } from '@lib/gateway'
import { YeelightDiscoveryClient } from '@gateway/client-yeelight'

type ApiConf = Parameters<typeof api>[0]

const getLightActions = flow(
  () => new YeelightDiscoveryClient(),
  client => new Gateway(client),
  gateway => initLightActions(gateway)
)

const devConf: ApiConf = { actions: { getLightActions } }

api(devConf)
