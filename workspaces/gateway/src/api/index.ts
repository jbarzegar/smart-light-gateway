import * as express from 'express'
import * as chalk from 'chalk'
import { json as jsonParser } from 'body-parser'
import * as morgan from 'morgan'
import * as apiConf from '@config/api.config'

import initRouter from './routes'

const app = express()

const middleware = [jsonParser(), morgan('dev')]

type RouterParams = Parameters<typeof initRouter>[0]
interface Deps extends RouterParams {}

/** API startup */
export default (deps: Deps) => {
  // Apply middleware
  middleware.forEach(m => app.use(m))

  // Init app routes
  app.use('/', initRouter(deps))

  app.listen(apiConf.API_PORT, () => {
    if (process.env.NODE_ENV === 'development')
      console.log('🚧 gateway running in dev')

    console.log(
      `👀 gateway api running on watching on: ${chalk.yellow(apiConf.API_PORT)}`
    )
  })
}
