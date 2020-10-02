import * as React from 'react'
import { Box, Text, Flex } from '@chakra-ui/core'
import { startCase } from 'lodash'
import { RiLightbulbLine } from 'react-icons/ri'
import { Light, PowerStatus } from 'types'
import { LightButtonRow } from 'components/LightButtonRow'

type LightCardProps = {
  light: Light
  onPowerBtnClick(id: string, powerStatus: PowerStatus): void
}
export const LightCard = ({ light, onPowerBtnClick }: LightCardProps) => {
  const handlePowerClick = (powerMode: PowerStatus) => () =>
    onPowerBtnClick(light.id, powerMode)

  return (
    <Box
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
      <Flex justify="space-between">
        <LightButtonRow
          lightStatus={light.status}
          onPowerOff={handlePowerClick('off')}
          onPowerOn={handlePowerClick('on')}
        />
        <Flex align="center" color="gray.500" pr={2} pb={0}>
          <Text mr={4}>{light.host}</Text>
          <Text>{light.port}</Text>
        </Flex>
      </Flex>
    </Box>
  )
}
