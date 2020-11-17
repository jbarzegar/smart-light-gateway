import * as React from 'react'
import { Box, Text, Flex } from '@chakra-ui/core'
import { startCase } from 'lodash'
import { RiLightbulbLine } from 'react-icons/ri'
import { Light, PowerStatus } from 'types'
import { LightButtonRow } from 'components/LightButtonRow'
import { Card, CardProps } from 'components/Card'

type LightCardProps = CardProps & {
  light: Light
  onPowerBtnClick(id: string, powerStatus: PowerStatus): void
}
export const LightCard = ({
  light,
  onPowerBtnClick,
  isLoaded,
}: LightCardProps) => {
  const handlePowerClick = (powerMode: PowerStatus) => () =>
    onPowerBtnClick(light.id, powerMode)

  return (
    <Card isLoaded={isLoaded}>
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
    </Card>
  )
}
