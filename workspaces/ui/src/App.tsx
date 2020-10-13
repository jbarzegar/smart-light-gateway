import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Discovered } from 'views/Lights'

/* type RouteItem = React.ComponentType | { [k: string]: React.ComponentType }
type RouteMap = Record<string, RouteItem>
 */
const routes = {
  '/': () => <Redirect to="/lights" />,
  '/lights': Discovered,
}

const App = () => {
  return (
    <>
      <Router>
        {Object.entries(routes).map(([path, Component]) => (
          <Route key={`__key-${path}`} path={path} component={Component} />
        ))}
      </Router>
    </>
  )
}

export default App
