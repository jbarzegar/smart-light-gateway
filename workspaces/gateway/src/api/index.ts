import * as apiConf from '@config/api.config'
import { json as jsonParser } from 'body-parser'
import * as chalk from 'chalk'
import { flow } from 'lodash'
import * as morgan from 'morgan'
import { Application, NextHandleFunction, Router, AppActions } from 'types'
import useRouter from 'api/routes'

type RouterParams = { actions: AppActions }
type Deps = RouterParams

const applyMiddleware = (...middleware: NextHandleFunction[]) => (
  app: Application
) => app.use(...middleware)

const initRouter = (
  deps: Deps,
  route: string = '/',
  router: (deps: Deps) => Router = useRouter
) => (app: Application) => app.use(route, router(deps))

type ListenerParams = { port: number; onListening: () => void }
const createServer = (config: ListenerParams) => (app: Application) =>
  app.listen(config.port, config.onListening)

/** API startup */
export default (deps: Deps) => {
  const setupApp = flow(
    require('express'),
    applyMiddleware(jsonParser(), morgan('dev')),
    initRouter(deps)
  )
  const app = setupApp()

  const onListening = () => {
    if (process.env.NODE_ENV === 'development')
      console.log('🚧 gateway running in dev')

    console.log(
      `👀 gateway api running on watching on: ${chalk.yellow(apiConf.API_PORT)}`
    )
  }

  const listen = createServer({ onListening, port: apiConf.API_PORT as number })

  listen(app)
}
