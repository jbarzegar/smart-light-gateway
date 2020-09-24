export type PowerStatus = 'off' | 'on'

export interface Light {
  id: string
  name: string
  host: string
  port: string
  status: 'off' | 'on'
}
