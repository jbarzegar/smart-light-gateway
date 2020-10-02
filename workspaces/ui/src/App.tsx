import React from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  ThemeProvider,
  theme,
  Text,
  Box,
  SimpleGrid,
  Skeleton,
  Heading,
} from '@chakra-ui/core'
import { lights } from 'api'
import { Light, PowerStatus, Queries } from 'types'
import { setLightStatus } from 'effects'
import { LightCard } from 'components/LightCard'

const Discovered = () => {
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

  React.useEffect(() => {
    console.log(mutation.status)
  }, [mutation.status])

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
    <Box p={20} pt={0}>
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
                  onPowerBtnClick={handlePowerButtonClick}
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
