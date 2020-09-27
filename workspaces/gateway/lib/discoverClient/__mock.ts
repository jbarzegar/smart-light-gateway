import Light, {
  ConnectedLight,
  MethodOptions,
  PowerMode,
  BaseLight,
} from '@lib/entities/lights'
import { createStore } from '@lib/util'
import { DiscoverClient } from './'
import { globalLights } from '../constants'

type FindFn<T> = (x: T, index?: number) => boolean
const insert = <T>(arr: T[], index: number | FindFn<T>, item: T): T[] => {
  const newArr = [...arr]
  const getIndex = (): number => {
    switch (typeof index) {
      case 'number':
        return index
      case 'function':
        return newArr.findIndex((x, i) => index(x, i))
    }
  }

  newArr[getIndex()] = item

  return newArr
}

function createLight(base: BaseLight): Light {
  const buildLight = (_: Partial<BaseLight>) => ({ ...base, ..._ })
  const makeConnect = (conf: Partial<BaseLight> = {}) => async (): Promise<
    ConnectedLight
  > => ({
    ...buildLight(conf),
    getStatus: () => 'something',
    async setPower(status: PowerMode, opts: MethodOptions) {
      const newLight = {
        ...buildLight({ status }),
        connect: makeConnect({ status }),
      }

      store.setState(state => ({
        ...state,
        lights: insert<Light>(
          state.lights,
          x => x.id === newLight.id,
          newLight
        ),
      }))
    },
    async setBrightness(int: number, opts: any) {},
    async setColor(color: string, opts: any) {},
    async disconnect() {},
  })

  return {
    ...base,
    connect: makeConnect(),
  }
}
const store = createStore<{ lights: Light[] }>({
  lights: globalLights.map(createLight),
})

export class MockClient implements DiscoverClient<Light> {
  lightCount: number = 12

  constructor(opts: { lightCount?: number } = {}) {
    this.lightCount = opts?.lightCount || 12
  }

  async cleanup() {
    console.warn('TODO: Not implemented')
  }

  getLights = () => store.getState().lights

  async discoverAllLights(): Promise<Light[]> {
    return this.getLights()
  }
}
