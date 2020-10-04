import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ThemeProvider, theme } from '@chakra-ui/core'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <>
        <App />
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
