import * as React from 'react'
import { SimpleGrid } from '@chakra-ui/core'

export const CardGrid = ({ children }: React.PropsWithChildren<{}>) => (
  <SimpleGrid columns={6} spacing={10} minChildWidth={250}>
    {children}
  </SimpleGrid>
)
