import * as React from 'react'
import { Box, Skeleton } from '@chakra-ui/core'

export type CardProps = {
  isLoaded: boolean
}
export const Card = ({
  isLoaded,
  children,
}: React.PropsWithChildren<CardProps>) => {
  return (
    <Skeleton
      isLoaded={isLoaded}
      colorStart="#4A5568"
      colorEnd="#171923"
      minH={250}
    >
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
        {children}
      </Box>
    </Skeleton>
  )
}
