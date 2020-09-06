import { Router } from 'express'
import { LightActions, AppActions } from 'types'

const lightRoutes = (actions: LightActions) => {
  const route = Router()

  route.get('/', async (_, res) => {
    const response = await actions.getAllLights()
    return res.send(response)
  })

  return route
}

const adminRoutes = () => {
  const route = Router()

  route.get('/', (_, res) => res.send('ye'))

  return route
}

const routes = (props: { actions: AppActions }) => {
  const { actions } = props
  const router = Router()

  router.use('/lights', lightRoutes(actions.light))
  router.use('/admin', adminRoutes())

  return router
}

export default routes
