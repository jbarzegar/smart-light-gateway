import * as React from 'react'
import { Box, Text, Flex } from '@chakra-ui/core'
import { startCase } from 'lodash'
import { RiLightbulbLine } from 'react-icons/ri'
import { useHoverEvent } from 'hooks'
import { Light, PowerStatus } from 'types'

import { LightButtonRow } from './LightButtonRow'

type LightCardProps = {
  light: Light
  onPowerBtnClick(id: string, powerStatus: PowerStatus): void
}
export const LightCard = ({ light, onPowerBtnClick }: LightCardProps) => {
  const { hovered, getEventProps } = useHoverEvent()

  const handlePowerClick = (powerMode: PowerStatus) => () =>
    onPowerBtnClick(light.id, powerMode)

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
      <Box as={RiLightbulbLine} fontSize="6xl" />
      <Text fontSize="2xl" color="gray.900" fontWeight="bold">
        {startCase(light.name)}
      </Text>

      {hovered ? (
        <LightButtonRow
          lightStatus={light.status}
          onPowerOff={handlePowerClick('off')}
          onPowerOn={handlePowerClick('on')}
        />
      ) : (
        <Flex align="center" color="gray.500">
          <Text mr={4}>{light.host}</Text>
          <Text>{light.port}</Text>
        </Flex>
      )}
    </Box>
  )
}
