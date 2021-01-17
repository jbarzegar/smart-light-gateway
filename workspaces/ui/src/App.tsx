import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Box } from '@chakra-ui/core'
import { RouterObject } from 'types'
import { Discovered } from 'views/Lights'
import { RoomView } from 'views/Rooms'

const routes: RouterObject = {
  '/': {
    exact: true,
    component: () => (
      <Box width="100%">
        <p>Dashboard</p>
        <Box pr={1}>
          <Link to="/lights">Lights</Link>
        </Box>
        <Link to="/rooms">Rooms</Link>
      </Box>
    ),
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
