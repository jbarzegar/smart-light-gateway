import { LightActions } from 'types'
import { useRouter } from '../utils'

type LightIdParams = { lightId: string }
type PowerParams = { powerStatus: 'off' | 'on' }

export const useLightView = useRouter<LightActions>(([actions, route]) => {
  route.get('/', async (_, res) => {
    const response = await actions.getAllLights()
    return res.status(200).json(response)
  })

  route.get<LightIdParams>('/:lightId', async (req, res) => {
    const { lightId } = req.params
    const light = await actions.getLightById(lightId)

    console.log(light)

    if (!light) {
      return res
        .status(404)
        .json({ error: { message: 'Could not find light ' } })
    }

    return res.status(200).json(light)
  })

  route.post<LightIdParams, any, PowerParams>(
    '/:lightId/power',
    async (req, res) => {
      const { lightId } = req.params
      const { powerStatus } = req.body
      const light = await actions.getLightById(lightId)

      const notFound = (message: string) =>
        res.status(404).json({
          error: {
            message,
          },
        })

      if (!['off', 'on'].includes(powerStatus))
        return res.status(400).send({
          error: {
            message: 'powerStatus must be set to either: "off" or "on"',
          },
        })

      if (!light) return notFound(`Could not find light with id ${lightId}`)

      actions
        .setLightPower(lightId, powerStatus)
        .then(status =>
          !!status
            ? res.status(200).send({ status })
            : notFound('could not find light')
        )
        .catch(err => {
          console.log(err)
          res.status(400).json(err)
        })
    }
  )
})
