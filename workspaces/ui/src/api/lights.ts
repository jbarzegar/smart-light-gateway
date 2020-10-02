import { Light, PowerStatus } from 'types'

import { sendRequest } from './'

export const getAll = () =>
  sendRequest<Light[]>({ to: '/api/lights', handle: as => as.json() })

type SetPowerResponse = { status: PowerStatus }
type SetPowerVariables = { id: string; powerStatus: PowerStatus }

export const setPower = ({ id, powerStatus }: SetPowerVariables) =>
  sendRequest<SetPowerResponse>(
    { to: `/api/lights/${id}/power`, handle: as => as.json() },
    { method: 'POST', body: JSON.stringify({ powerStatus }) }
  )
