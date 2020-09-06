import { v4 as uuid } from 'uuid'
import Light from '@lib/entities/lights'
import { DiscoverClient } from './'

export class MockClient implements DiscoverClient<Light> {
  lightCount: number = 12
  lightConf: Omit<Light, 'connect' | 'id'>
  constructor(opts: { lightCount?: number } = {}) {
    this.lightCount = opts?.lightCount || 12
    this.lightConf = {
      host: '0.0.0.0',
      port: 420,
    }
  }
  private setId() {
    return uuid()
  }
  async cleanup() {
    console.warn('TODO: Not implemented')
  }
  async discoverAllLights(): Promise<Light[]> {
    const arr = new Array<Light>(this.lightCount).fill({} as Light)

    return arr.map((_, i) => {
      const conf = {
        ...this.lightConf,
        id: this.setId(),
        name: `mocked-light-${i}`,
      }
      const connect = async () => ({
        ...conf,
        getStatus: () => 'something',
        async setPower(status: any, opts: any) {},
        async setBrightness(int: number, opts: any) {},
        async setColor(color: string, opts: any) {},
        async disconnect() {},
      })
      return {
        ...conf,
        connect,
      }
    })
  }
}
