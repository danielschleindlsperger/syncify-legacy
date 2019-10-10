import React from 'react'
import { Room } from './room'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export const App = () => (
  <>
    <header>header</header>
    <main>
      <Router>
        <Switch>
          <Route path="/room/:id">
            <Room />
          </Route>
        </Switch>
      </Router>
    </main>
    <footer>footer</footer>
  </>
)
