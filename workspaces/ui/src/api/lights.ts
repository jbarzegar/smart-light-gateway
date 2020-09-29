import { Light, PowerStatus } from 'types'

import { sendRequest } from './'

export const getAll = () =>
  sendRequest<Light[]>({ to: '/api/lights', handle: as => as.json() })

export const setPower = (id: string, powerStatus: PowerStatus) =>
  sendRequest<{ status: PowerStatus }>(
    { to: `/api/lights/${id}/power`, handle: as => as.json() },
    { method: 'POST', body: JSON.stringify({ powerStatus }) }
  )
