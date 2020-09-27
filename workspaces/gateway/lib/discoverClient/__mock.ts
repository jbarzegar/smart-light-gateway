import Light, { ConnectedLight, BaseLight } from '@lib/entities/lights'
import { createStore, insert } from '@lib/util'
import { DiscoverClient } from './'
import { globalLights } from '../constants'

type MakeConnect = (
  base: BaseLight,
  conf?: Partial<BaseLight>
) => () => Promise<ConnectedLight>
const makeConnect: MakeConnect = (base, conf = {}) => {
  const light = { ...base, ...conf }

  return async () => ({
    ...light,
    getStatus: () => 'something',

    setPower: async status => {
      store.setState(state => ({
        ...state,
        lights: insert<Light>({
          item: {
            ...light,
            connect: makeConnect(light, { status }),
          },
          into: state.lights,
          usingIndex: x => x.id === light.id,
        }),
      }))
    },

    async setBrightness(int: number, opts: any) {},
    async setColor(color: string, opts: any) {},
    async disconnect() {},
  })
}

const store = createStore<{ lights: Light[] }>({
  lights: globalLights.map(light => ({
    ...light,
    connect: makeConnect(light),
  })),
})

export class MockClient implements DiscoverClient<Light> {
  async cleanup() {
    console.warn('TODO: Not implemented')
  }

  discoverAllLights = async () => store.getState().lights
}
