import { LightActions } from 'types'
import { Gateway } from '@lib/gateway'

const initLightActions: (gateway: Gateway) => LightActions = gateway => ({
  async getAllLights() {
    const lights = await gateway.discover()
    return lights
  },
})

export default initLightActions
