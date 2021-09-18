import * as apiConf from '@config/api.config'
import { json as jsonParser } from 'body-parser'
import * as chalk from 'chalk'
import { flow } from 'lodash'
import * as morgan from 'morgan'
import { Application, Router, AppActions } from 'types'
import { applyMiddleware } from 'api/utils'
import logger from '@lib/logger'
import useRouter from 'api/routes'

type RouterParams = { actions: AppActions }
type Deps = RouterParams

const initRouter = (
  deps: Deps,
  route: string = '/',
  router: (deps: Deps) => Router = useRouter
) => (app: Application) => app.use(route, router(deps))

type ListenerParams = { port: number; onListening: () => void }
const createServer = (config: ListenerParams) => (app: Application) =>
  app.listen(config.port, config.onListening)

const setupApp = (deps: Deps) =>
  flow(
    require('express'),
    applyMiddleware(jsonParser(), morgan('dev')),
    initRouter(deps)
  )

const renderApiRoutes = (app: Application) => {
  const listEndpoints = require('express-list-endpoints')
  const endpoints: { path: string }[] = listEndpoints(app)

  return `
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
      `
}

const onListening = () => {
  if (process.env.NODE_ENV === 'development')
    logger.info('🚧 gateway running in dev')

  logger.success(
    `👀 gateway api running on watching on: ${chalk.yellow(apiConf.API_PORT)}`
  )
}

const setupDevelopment = (app: Application) => {
  app.get('/', (_, res) => {
    res.send(renderApiRoutes(app))
  })

  app.post('/test', (req, res) => {
    console.log(req.body)
    res.status(204).send()
  })
}

/** API startup */
const main = (deps: Deps) => {
  const app = setupApp(deps)()

  if (process.env.NODE_ENV === 'development') {
    setupDevelopment(app)
  }

  const listen = createServer({ onListening, port: apiConf.API_PORT as number })

  listen(app)
}

export default main
