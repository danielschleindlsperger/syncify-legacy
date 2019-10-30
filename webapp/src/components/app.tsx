import { hot } from 'react-hot-loader'
import React from 'react'
import { Room } from '../views/room'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalStyles } from '../styling/global'
import { Home } from '../views/home'
import { AuthProvider, Authenticated } from './auth/auth'
import { SpotifyPlayerProvider } from './spotify-player'

let App = () => (
  <>
    <GlobalStyles />
    <main>
      <Router>
        <AuthProvider>
          <SpotifyPlayerProvider>
            <Switch>
              <Route path="/rooms/:id">
                <Authenticated>
                  <Room />
                </Authenticated>
              </Route>
              <Route path="/">
                <Home />
              </Route>
              <Route path="*">
                <h1>Page not found.</h1>
              </Route>
            </Switch>
          </SpotifyPlayerProvider>
        </AuthProvider>
      </Router>
    </main>
  </>
)

App = hot(module)(App)

export { App }
