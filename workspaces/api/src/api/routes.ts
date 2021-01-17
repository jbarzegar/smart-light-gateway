import { AppActions } from 'types'
import { useRouter } from 'api/utils'
import { useLightView } from 'api/views'

type RouteDeps = { actions: AppActions }
const routes = useRouter<RouteDeps>(([props, route]) => {
  const { actions } = props

  route.use('/lights', useLightView(actions.getLightActions()))
})

export default routes
