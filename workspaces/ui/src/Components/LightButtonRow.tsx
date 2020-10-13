import * as React from 'react'
import { Flex } from '@chakra-ui/core'
import { PowerStatus } from 'types'
import { LightPowerButton } from 'components/LightPowerButton'

export const LightButtonRow = (
  _: Record<'onPowerOn' | 'onPowerOff', () => void> & {
    lightStatus: PowerStatus
  }
) => (
  <Flex alignItems="center">
    <LightPowerButton
      mr="4"
      isActive={_.lightStatus === 'off'}
      onClick={_.onPowerOff}
    >
      Off
    </LightPowerButton>
    <LightPowerButton isActive={_.lightStatus === 'on'} onClick={_.onPowerOn}>
      On
    </LightPowerButton>
  </Flex>
)
