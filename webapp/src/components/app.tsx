import React from 'react'
import { Room } from './room'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalStyles } from '../styling/global'
import { Home } from './home'

export const App = () => (
  <>
    <GlobalStyles />
    <header>header</header>
    <main>
      <Router>
        <Switch>
          <Route path="/rooms/:id">
            <Room />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </main>
    <footer>footer</footer>
  </>
)
