import * as React from 'react'
import { Button, ButtonProps } from '@chakra-ui/core'

const getActiveVariant = (active: boolean) =>
  active
    ? {
        bg: 'gray.900',
        color: 'white',
      }
    : {
        bg: 'transparent',
        color: 'gray.900',
      }

export type LightPowerButtonProps = { isActive: boolean } & ButtonProps
export const LightPowerButton = ({
  isActive,
  ...props
}: LightPowerButtonProps) => (
  <Button
    {...props}
    {...getActiveVariant(isActive)}
    border="2px solid"
    borderColor="gray.900"
  />
)
