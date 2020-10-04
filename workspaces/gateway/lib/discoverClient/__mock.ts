import Light, { ConnectedLight, BaseLight } from '@lib/entities/lights'
import { DiscoverClient } from './'
import { globalLights } from '../constants'
import * as low from 'lowdb'
import * as Sync from 'lowdb/adapters/FileAsync'

const adapter = new Sync('db.json')
const db = low<low.AdapterSync<{ lights: Light[] }>>(adapter)

;(async () => (await db).defaults({ lights: globalLights }).write())()

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
      await (await db)
        .get('lights')
        .find({ id: light.id })
        .assign({ status })
        .write()
      return
    },

    async setBrightness(int: number, opts: any) {},
    async setColor(color: string, opts: any) {},
    async disconnect() {},
  })
}

export class MockClient implements DiscoverClient<Light> {
  async cleanup() {
    console.warn('TODO: Not implemented')
  }

  discoverAllLights = async () =>
    (await db)
      .get('lights')
      .value()
      .map(x => ({ ...x, connect: makeConnect(x) }))
}
