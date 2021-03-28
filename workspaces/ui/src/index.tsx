import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient } from 'react-query'
import { Provider as ReduxProvider } from 'react-redux'

import App from 'App'
import { createStore } from 'global/store'
import { ThemeProvider, QueryProvider } from 'global/Providers'

import reportWebVitals from './reportWebVitals'

const queryClient = new QueryClient()
const store = createStore()

ReactDOM.render(
  <React.StrictMode>
    <QueryProvider queryClient={queryClient}>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ReduxProvider>
    </QueryProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
