import { Light, LightClientConnected, DiscoverClient } from '@gateway/types'

import { mockLights } from './data'

import * as low from 'lowdb'
import * as Sync from 'lowdb/adapters/FileAsync'

const adapter = new Sync('db.json')
const db = low<low.AdapterAsync<{ lights: Light[] }>>(adapter)

;(async () => (await db).defaults({ lights: mockLights }).write())()

type FnMakeConnect = (
  base: Light,
  conf?: Partial<Light>
) => () => Promise<LightClientConnected>
const makeConnect: FnMakeConnect = (base, conf = {}) => {
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
    return
  }

  discoverAllLights = async () =>
    (await db)
      .get('lights')
      .value()
      .map(light => ({ ...light, connect: makeConnect(light) }))
}
