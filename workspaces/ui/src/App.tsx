import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RouterObject } from 'types'
import { Discovered } from 'views/Lights'
import { RoomView } from 'views/Rooms'

const routes: RouterObject = {
  '/': {
    exact: true,
    component: () => <p>Dashboard</p>,
  },
  '/lights': {
    component: Discovered,
  },
  '/rooms': {
    component: RoomView,
  },
}

const App = () => {
  return (
    <Router>
      <Switch>
        {Object.entries(routes).map(([path, props]) => (
          <Route key={path} path={path} {...props} />
        ))}
      </Switch>
    </Router>
  )
}

export default App
