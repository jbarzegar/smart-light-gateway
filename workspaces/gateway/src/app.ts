// Actual app
/** Init api */
import api from './api'
import initLightActions from './actions/lights'
import { Gateway } from '@lib/gateway'

import { MockClient } from '@lib/discoverClient/__mock'

const lightClient = new MockClient()
const gateway = new Gateway(lightClient)

api({
  actions: {
    light: initLightActions(gateway),
  },
})
