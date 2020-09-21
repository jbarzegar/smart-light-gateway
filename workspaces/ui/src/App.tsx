import React from 'react'
import {
  ThemeProvider,
  theme,
  Text,
  Box,
  Flex,
  SimpleGrid,
  Skeleton,
  Heading,
} from '@chakra-ui/core'
import { useQuery } from 'react-query'
import { startCase } from 'lodash'
import { RiLightbulbLine } from 'react-icons/ri'
import { Light } from './types'

enum ApiRoutes {
  lights = '/api/lights',
}

const getDiscoveredLights = async (): Promise<Light[]> => {
  try {
    const resp = await fetch(ApiRoutes.lights)
    if (!resp.ok) throw { err: 'fetchNotOk', obj: resp }
    const data: Light[] = await resp.json()

    return data
  } catch (e) {
    throw e
  }
}
const Discovered = () => {
  const { data, status, error } = useQuery<Light[]>(
    'discoveredLights',
    getDiscoveredLights
    // (): Promise<Light[]> =>
    //   new Promise(resolve => setTimeout(() => resolve([]), 2000))
  )
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
                <Box
                  key={light.id}
                  padding={4}
                  borderColor="gray.900"
                  borderWidth={2}
                  borderStyle="solid"
                  borderRadius="10px"
                  boxShadow={
                    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }
                >
                  <Box as={RiLightbulbLine} fontSize="6xl"></Box>
                  <Text fontSize="2xl" color="gray.900" fontWeight="bold">
                    {startCase(light.name)}
                  </Text>
                  <Flex align="center" color="gray.500">
                    <Text mr={4}>{light.host}</Text>
                    <Text>{light.port}</Text>
                  </Flex>
                </Box>
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

// App = () => <p>'yote'</p>
export default App
