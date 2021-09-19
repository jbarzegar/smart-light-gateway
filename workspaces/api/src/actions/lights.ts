import {
  Light,
  LightClientDisconnected,
  MethodOptions,
  PowerMode,
  LightActions,
} from 'types'
import { Gateway } from '@lib/gateway'

type ID = string | number

const defaultLightConf: MethodOptions = { timing: 500, transition: 'smooth' }

const byId = (id: ID) => (x: Light) => id === x.id

type FnGetLightById = (id: ID) => Promise<Light | undefined>
type FnSetPower = (
  light: LightClientDisconnected,
  mode: PowerMode
) => Promise<void>

type FnInitAction<Actions> = (
  gateway: Gateway,
  config?: MethodOptions
) => Actions
const initLightActions: FnInitAction<LightActions> = (
  gateway,
  conf = defaultLightConf
) => {
  const getLightById: FnGetLightById = async id =>
    (await gateway.discover()).find(byId(id))

  const setPower: FnSetPower = async (light, mode) => {
    const l = await light.connect()
    await l.setPower(mode, conf)
    await l.disconnect()
  }

  return {
    getAllLights: () => gateway.discover(),
    getLightById,
    async setLightPower(id, powerMode) {
      const light = await getLightById(id)

      if (!light) return undefined

      await setPower(light as LightClientDisconnected, powerMode)
      return powerMode
    },
  }
}

export default initLightActions
