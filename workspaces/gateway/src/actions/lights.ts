import { LightActions } from 'types'
import { Gateway } from '@lib/gateway'

type lightActions = (gateway: Gateway) => LightActions
const initLightActions: lightActions = gateway => ({
  async getAllLights() {
    const lights = await gateway.discover()
    return lights
  },
})

export default initLightActions
