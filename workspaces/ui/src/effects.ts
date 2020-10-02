import { queryCache } from 'react-query'
import { Light, PowerStatus, Queries } from 'types'
import { updateElement } from 'utils'

type Setter<T> = (state: T) => T

/** Modify light query cache */
const setLightState = (setter: Setter<Light[]>) => {
  queryCache.setQueryData<Light[]>(Queries.discoveredLights, data => {
    if (!data) return []
    else return setter(data)
  })
}

export const setLightStatus = (status: PowerStatus, lightId: string) => {
  setLightState(state =>
    updateElement<Light>({
      in: state,
      where: x => x.id === lightId,
      setter: light => ({ ...light, status }),
    })
  )
}
