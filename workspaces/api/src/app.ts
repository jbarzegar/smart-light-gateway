import { flow } from 'lodash'
import api from './api'
import initLightActions from './actions/lights'

import { Gateway } from '@lib/gateway'
import { MockClient } from '@lib/clients'

type ApiConf = Parameters<typeof api>[0]

const getLightActions = flow(
  () => new MockClient(),
  client => new Gateway(client),
  gateway => initLightActions(gateway)
)

const devConf: ApiConf = { actions: { getLightActions } }

api(devConf)
