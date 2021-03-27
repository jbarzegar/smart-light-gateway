import { PropsWithChildren } from 'react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { isEnv } from 'utils'

export const ThemeProvider = (props: PropsWithChildren<{}>) => (
  <ChakraProvider theme={theme} {...props} />
)

export const StateProvider = (
  props: PropsWithChildren<{ store: EnhancedStore }>
) => <ReduxProvider {...props} />

export const QueryProvider = (
  props: PropsWithChildren<{ queryClient: QueryClient }>
) => (
  <>
    <QueryClientProvider client={props.queryClient}>
      {props.children}
      {isEnv('development') && <ReactQueryDevtools />}
    </QueryClientProvider>
  </>
)
