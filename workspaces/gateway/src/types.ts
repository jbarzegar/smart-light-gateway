import { Router, Request, Response } from 'express'
import Light from '@lib/entities/lights'

export type ViewFn = (router: Router) => void

export interface LightActions {
  getAllLights(): Promise<Light[]>
}

export interface AppActions {
  light: LightActions
}

export { Request, Response }
