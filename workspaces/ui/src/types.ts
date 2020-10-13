export type PowerStatus = 'off' | 'on'

interface BaseDevice {
  id: string
  name: string
  host: string
  port: string
}

export interface Light extends BaseDevice {
  type: 'light'
  status: 'off' | 'on'
}

/** All present queries existing in react-query's cache */
export enum Queries {
  discoveredLights = 'all lights',
}
type Device = Light

export interface Room {
  id: string
  name: string
  devices: Device[]
}
