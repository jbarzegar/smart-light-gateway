import { flow } from 'lodash'
import { LightActions } from 'types'
import { Gateway } from '@lib/gateway'
import Light, {
  ConnectedLight,
  MethodOptions,
  PowerMode,
} from '@lib/entities/lights'
import { ID } from '@lib/util'

type InitActionFn<Actions> = (
  gateway: Gateway,
  config?: MethodOptions
) => Actions

const defaultLightConf: MethodOptions = { timing: 500, transition: 'smooth' }

const byId = (id: ID) => (x: Light) => id === x.id

const initLightActions: InitActionFn<LightActions> = (
  gateway,
  conf = defaultLightConf
) => {
  const getLightById = flow<
    [ID],
    { id: ID; lights: Promise<Light[]> },
    Promise<Light | undefined>
  >(
    id => ({ lights: gateway.discover(), id }),
    async ({ id, lights }) => (await lights).find(byId(id))
  )

  const setPower = flow<
    [Light, PowerMode],
    { mode: PowerMode; light: Promise<ConnectedLight> },
    Promise<void>
  >(
    (light, mode) => ({ mode, light: light.connect() }),
    async ({ mode, light }) => {
      const l = await light
      await l.setPower(mode, conf)
      l.disconnect()
    }
  )

  return {
    getAllLights: () => gateway.discover(),
    getLightById,
    async setLightPower(id, powerMode) {
      const light = await getLightById(id)

      if (!light) return undefined

      await setPower(light, powerMode)
      return powerMode
    },
  }
}

export default initLightActions
