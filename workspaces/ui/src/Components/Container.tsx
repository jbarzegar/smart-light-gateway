import * as React from 'react'
import { Box } from '@chakra-ui/core'

export const Container = (props: React.PropsWithChildren<{}>) => (
  <Box p={20} pt={0} {...props} />
)
