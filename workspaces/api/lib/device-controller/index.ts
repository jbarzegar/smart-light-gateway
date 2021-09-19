//
import {
  Light,
  LightClientDisconnected,
  MethodOptions,
  PowerMode,
  LightActions,
} from 'types'
import { Gateway } from '@lib/gateway'
import { ID, byId } from './util'

const defaultLightConf: MethodOptions = { timing: 500, transition: 'smooth' }

type FnGetLightById = (id: ID) => Promise<Light | undefined>
type FnSetPower = (
  light: LightClientDisconnected,
  mode: PowerMode
) => Promise<void>

type FnCreateController<Actions> = (
  gateway: Gateway,
  config?: MethodOptions
) => Actions
export const createDeviceController: FnCreateController<LightActions> = (
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
