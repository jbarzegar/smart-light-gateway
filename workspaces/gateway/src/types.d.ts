import { Router, Request, Response, NextFunction, Application } from 'express'
import Light, { PowerMode } from '@lib/entities/lights'

export type ViewFn = (router: Router) => void

export type LightActions = {
  getAllLights(): Promise<Light[]>
  getLightById(id: string): Promise<Light | undefined>
  setLightPower(id: string, power: PowerMode): Promise<PowerMode | undefined>
}

export type AppActions = {
  getLightActions(): LightActions
}

export { Request, Response, Application, Router }

export type NextHandleFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void

export type LightView<Actions extends { [key: string]: Function }> = (
  actions: Actions
) => Router
