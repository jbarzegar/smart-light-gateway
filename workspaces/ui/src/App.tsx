import React from 'react'
import {
  ThemeProvider,
  theme,
  Text,
  Box,
  SimpleGrid,
  Skeleton,
  Heading,
} from '@chakra-ui/core'
import { useMutation, useQuery, queryCache } from 'react-query'
import { Light, PowerStatus } from './types'
import { lights } from './api'
import { LightCard } from 'Components/LightCard'

enum Queries {
  discoveredLights,
}

const setLightStatus = (status: PowerStatus, lightId: string) => {
  queryCache.setQueryData<Light[]>(
    Queries.discoveredLights,
    (data): Light[] => {
      if (!data) return []

      const lights = [...data]
      const index = lights.findIndex(x => x.id === lightId)

      if (!lights[index]) return []

      lights[index] = { ...lights[index], status }

      return lights
    }
  )
}

const Discovered = () => {
  const { data, status, error } = useQuery<Light[]>(
    Queries.discoveredLights,
    lights.getAll
  )
  const [mutatePower] = useMutation(lights.setPower, {
    onSuccess: ({ status }, { id }) => setLightStatus(status, id),
  })

  if (status === 'error')
    return (
      <Text color="red.500" fontSize="6xl">
        API Error D:
        {console.log(error)}
      </Text>
    )

  return (
    <Box p={20}>
      {status === 'loading' && (
        <Heading fontSize="4xl">Discovering Lights...</Heading>
      )}
      <Skeleton
        isLoaded={status === 'success'}
        colorStart="#4A5568"
        colorEnd="#171923"
      >
        {data?.length ? (
          <>
            <Heading fontSize="4xl" mb={12}>
              Discovered {data.length} light(s)
            </Heading>
            <SimpleGrid columns={6} spacing={10} minChildWidth="250px">
              {data?.map(light => (
                <LightCard
                  light={light}
                  key={light.id}
                  onPowerBtnClick={(id, powerStatus) =>
                    mutatePower({ id, powerStatus })
                  }
                />
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Heading fontSize="4xl">No lights found</Heading>
        )}
      </Skeleton>
    </Box>
  )
}

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <Discovered />
    </>
  </ThemeProvider>
)

export default App
