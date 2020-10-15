import * as React from 'react'
import { useMutation, useQuery } from 'react-query'
import { Text, Heading } from '@chakra-ui/core'
import { lights } from 'api'
import { Light, PowerStatus, Queries } from 'types'
import { setLightStatus } from 'effects'
import { LightCard } from 'components/LightCard'
import { CardGrid } from 'components/CardGrid'
import { Container } from 'components/Container'

const defaultData = new Array(10).fill(0).map<Light>((n, i) => ({
  id: `${i + 1}`,
  name: '',
  host: '1234',
  status: 'on',
  type: 'light',
  port: '12',
}))

export const Discovered = () => {
  const { data, status, error } = useQuery<Light[]>(
    Queries.discoveredLights,
    lights.getAll
  )

  const [mutatePower, mutation] = useMutation(lights.setPower, {
    onSuccess: ({ status }, { id }) => {
      setLightStatus(status, id)
      mutation.reset()
    },
  })

  const hasData = !!data?.length

  const allLights = React.useMemo<Light[]>(
    () => (hasData ? (data as Light[]) : defaultData),
    [data, hasData]
  )

  const handlePowerButtonClick = (id: string, powerStatus: PowerStatus) => {
    if (mutation.status === 'idle') mutatePower({ id, powerStatus })
  }

  if (status === 'error')
    return (
      <Text color="red.500" fontSize="6xl">
        API Error D:
        {console.log(error)}
      </Text>
    )

  return (
    <Container>
      {status === 'loading' && (
        <Heading fontSize="4xl">Discovering Lights...</Heading>
      )}

      {status !== 'loading' && (
        <>
          {allLights.length ? (
            <Heading fontSize="4xl" mb={12}>
              Discovered {allLights.length} light(s)
            </Heading>
          ) : (
            <Heading fontSize="4xl">No lights found</Heading>
          )}
        </>
      )}

      <CardGrid>
        {allLights.map(light => (
          <LightCard
            isLoaded={status === 'success'}
            light={light}
            key={light.id}
            onPowerBtnClick={handlePowerButtonClick}
          />
        ))}
      </CardGrid>
    </Container>
  )
}
