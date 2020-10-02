export type PowerStatus = 'off' | 'on'

export interface Light {
  id: string
  name: string
  host: string
  port: string
  status: 'off' | 'on'
}

/** All present queries existing in react-query's cache */
export enum Queries {
  discoveredLights,
}
