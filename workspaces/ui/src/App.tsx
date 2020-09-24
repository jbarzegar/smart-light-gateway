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
  Button,
} from '@chakra-ui/core'
import { useMutation, useQuery, queryCache } from 'react-query'
import { startCase } from 'lodash'
import { RiLightbulbLine } from 'react-icons/ri'
import { Light, PowerStatus } from './types'

const defaultRequestObj: RequestInit = {
  headers: { 'Content-Type': 'application/json' },
}
const promise = (
  fn: (
    resolve: (value?: unknown) => void,
    reject: (value?: unknown) => void
  ) => void
) => new Promise((resolve, reject) => fn(resolve, reject))

const sendRequest = (
  url: string,
  responseHandler: (response: Response) => Promise<any>,
  options: RequestInit = defaultRequestObj
) =>
  promise((resolve, reject) =>
    fetch(url, { ...defaultRequestObj, ...options })
      .then(resp => (resp.ok ? responseHandler(resp) : reject(resp)))
      .then(_ => resolve(_))
      .catch(err => reject(err))
  )

const getDiscoveredLights = (): Promise<Light[]> =>
  sendRequest('/api/lights', _ => _.json()) as Promise<Light[]>

const setLightPower = (id: string, powerStatus: PowerStatus) =>
  sendRequest(`/api/lights/${id}/power`, _ => _.json(), {
    method: 'POST',
    body: JSON.stringify({ powerStatus }),
  })

const useHoverEvent = () => {
  const [hovered, setHovered] = React.useState(false)

  const hoverProps = React.useMemo(
    () => ({
      hovered,
      getEventProps: () => ({
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      }),
    }),
    [hovered]
  )

  return hoverProps
}

const LightCard = ({
  light,
  onPowerBtnClick,
}: {
  light: Light
  onPowerBtnClick: (id: string, powerStatus: PowerStatus) => void
}) => {
  const { hovered, getEventProps } = useHoverEvent()

  const handlePowerClick = React.useCallback(
    (powerMode: PowerStatus) => () => onPowerBtnClick(light.id, powerMode),
    [light.id, onPowerBtnClick]
  )

  const buttonStyles = (x: boolean) => ({
    bg: x ? 'gray.900' : 'transparent',
    color: x ? 'white' : 'gray.900',
    border: '2px solid',
    borderColor: 'gray.900',
  })

  return (
    <Box
      {...getEventProps()}
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

      {hovered ? (
        <Flex alignItems="center">
          <Button
            mr="4"
            {...buttonStyles(light.status === 'off')}
            onClick={handlePowerClick('off')}
          >
            Off
          </Button>
          <Button
            {...buttonStyles(light.status === 'on')}
            onClick={handlePowerClick('on')}
          >
            On
          </Button>
        </Flex>
      ) : (
        <Flex align="center" color="gray.500">
          <Text mr={4}>{light.host}</Text>
          <Text>{light.port}</Text>
        </Flex>
      )}
    </Box>
  )
}

const Discovered = () => {
  const { data, status, error } = useQuery<Light[]>(
    'discoveredLights',
    getDiscoveredLights
  )
  const [mutatePower] = useMutation(
    (variables: { id: string; powerStatus: PowerStatus }) =>
      setLightPower(variables.id, variables.powerStatus),
    {
      onSuccess: () => {
        queryCache.refetchQueries('discoveredLights')
      },
    }
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
