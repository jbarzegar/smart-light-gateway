import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Discovered } from 'views/Lights'
import { RoomView } from 'views/Rooms'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <p>Dashboard</p>} />
        <Route path="/lights" component={Discovered} />
        <Route path="/rooms" component={RoomView} />
      </Switch>
    </Router>
  )
}

export default App
