import * as apiConf from '@config/api.config'
import { json as jsonParser } from 'body-parser'
import * as chalk from 'chalk'
import { flow } from 'lodash'
import * as morgan from 'morgan'
import { Application, NextHandleFunction, Router, AppActions } from 'types'
import logger from 'utils/logger'
import useRouter from 'api/routes'
const listEndpoints = require('express-list-endpoints')

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

  if (process.env.NODE_ENV === 'development') {
    const endpoints: { path: string }[] = listEndpoints(app)

    app.get('/', (_, res) => {
      res.send(`
      <style>
        a {
          font-family: sans-serif;
          font-size: 40px;

        }
        html { padding: 1rem }
      </style>
      <html>
        ${endpoints.map(
          endpoint => `<a href="${endpoint.path}">${endpoint.path}</a>`
        )}
        </html>
      `)
    })
  }

  const onListening = () => {
    if (process.env.NODE_ENV === 'development')
      logger.info('🚧 gateway running in dev')

    logger.success(
      `👀 gateway api running on watching on: ${chalk.yellow(apiConf.API_PORT)}`
    )
  }

  const listen = createServer({ onListening, port: apiConf.API_PORT as number })

  listen(app)
}
