import { LightActions } from 'types'
import { useRouter } from '../utils'

export const useLightView = useRouter<LightActions>(([actions, route]) => {
  route.get('/', async (_, res) => {
    const response = await actions.getAllLights()
    return res.send(response)
  })
})
