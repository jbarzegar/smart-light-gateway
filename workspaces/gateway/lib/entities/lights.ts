import { ID } from '@lib/util'

interface _Light {
  id: ID
  port: number
  host: string
  name?: string
}

type MethodOptions = { timing: number; transition: 'smooth' | 'sudden' }

export interface ConnectedLight extends Omit<_Light, 'connect'> {
  getStatus(): string
  setPower(status: 'on' | 'off', options: MethodOptions): Promise<void>
  setBrightness(intensity: number, options: MethodOptions): Promise<void>
  setColor(color: string, options: MethodOptions): Promise<void>
  disconnect(): Promise<void>
}

export default interface Light extends _Light {
  /** return value indicates successful connection */
  connect(): Promise<ConnectedLight>
}
