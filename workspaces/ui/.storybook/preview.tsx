import { useColorMode } from '@chakra-ui/react'
import { StoryContext } from '@storybook/react'
import * as React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { withPerformance } from 'storybook-addon-performance'
import { ThemeProvider } from '../src/global/Providers'

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
}

const ColorMode = ({ theme }: { theme: 'dark' | 'light' }) => {
  const { setColorMode } = useColorMode()

  React.useEffect(() => {
    setColorMode(theme)
  }, [theme])

  return null
}

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const { direction, theme } = context.globals
  const dir = direction.toLowerCase()
  return (
    <ThemeProvider>
      <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
        <ColorMode theme={theme} />
        <StoryFn />
      </div>
    </ThemeProvider>
  )
}

const withReactQuery = (StoryFn: Function) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      <StoryFn />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export const decorators = [withReactQuery, withChakra, withPerformance]
