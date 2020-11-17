import * as React from 'react'
import { Button, ButtonProps } from '@chakra-ui/core'

export type LightPowerButtonProps = { isActive: boolean } & ButtonProps
export const LightPowerButton = ({
  isActive,
  ...props
}: LightPowerButtonProps) => <Button {...props} variant="outline" />
