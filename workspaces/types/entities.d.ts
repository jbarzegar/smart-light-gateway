import { ID } from './util'

export interface BaseLight {
  id: ID
  port: number
  host: string
  name?: string
  status: PowerMode
}

export type PowerMode = 'off' | 'on'
export type Transition = 'smooth' | 'sudden'
export type MethodOptions = { timing: number; transition: Transition }

export interface ConnectedLight extends Omit<BaseLight, 'connect'> {
  getStatus(): string
  setPower(status: PowerMode, options: MethodOptions): Promise<void>
  setBrightness(intensity: number, options: MethodOptions): Promise<void>
  setColor(color: string, options: MethodOptions): Promise<void>
  disconnect(): Promise<void>
}

export interface Light extends BaseLight {
  /** return value indicates successful connection */
  connect(): Promise<ConnectedLight>
}
