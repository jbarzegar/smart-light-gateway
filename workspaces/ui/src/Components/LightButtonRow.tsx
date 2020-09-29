import * as React from 'react'
import { Flex, Button, ButtonProps } from '@chakra-ui/core'
import { PowerStatus } from 'types'

type LightPowerButtonProps = { isActive: boolean } & ButtonProps
const LightPowerButton = ({ isActive, ...props }: LightPowerButtonProps) => {
  const variant = isActive
    ? {
        bg: 'gray.900',
        color: 'white',
      }
    : {
        bg: 'transparent',
        color: 'gray.900',
      }

  const styles = {
    ...variant,
    border: '2px solid',
    borderColor: 'gray.900',
  }
  return <Button {...props} {...styles} />
}

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
