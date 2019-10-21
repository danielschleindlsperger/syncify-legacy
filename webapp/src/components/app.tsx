import React from 'react'
import { Room } from '../views/room'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalStyles } from '../styling/global'
import { Home } from '../views/home'
import { AuthProvider, Authenticated } from './auth/auth'

export const App = () => (
  <>
    <GlobalStyles />
    <header>header</header>
    <main>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/rooms/:id">
              <Authenticated>
                <Room />
              </Authenticated>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </main>
    <footer>footer</footer>
  </>
)
