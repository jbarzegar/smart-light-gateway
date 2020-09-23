import { LightActions } from 'types'
import { Gateway } from '@lib/gateway'
import { MethodOptions } from '@lib/entities/lights'

type InitActionFn<Actions> = (gateway: Gateway) => Actions

const defaultLightConf: MethodOptions = { timing: 500, transition: 'smooth' }

const initLightActions: InitActionFn<LightActions> = gateway => ({
  async getAllLights() {
    const lights = await gateway.discover()

    return lights
  },

  async getLightById(id) {
    const lights = await gateway.discover()
    const light = lights.find(x => x.id === id)

    return light
  },
  async setLightPower(id, powerMode) {
    const lights = await gateway.discover()
    const light = lights.find(x => x.id === id)

    if (!light) return undefined

    const connectedLight = await light.connect()
    await connectedLight.setPower(powerMode, defaultLightConf)
    await connectedLight.disconnect()

    return powerMode
  },
})

export default initLightActions
