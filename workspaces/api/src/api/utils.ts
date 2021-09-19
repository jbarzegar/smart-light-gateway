import { Router as getRouter } from 'express'
import { Router, Application, NextHandleFunction } from 'types'

/** creates new router object, accepts closure fn passing express routing context and dependencies from caller */
export const useRouter = <Data extends Object>(
  /** callback used to interface with a contextual express `routing` object, returning a router object  */
  routingCB: (x: [Data, Router]) => void
) => (data: Data) => {
  const route = getRouter()
  routingCB([data, route])

  return route
}

export const applyMiddleware = (...middleware: NextHandleFunction[]) => (
  app: Application
) => app.use(...middleware)
