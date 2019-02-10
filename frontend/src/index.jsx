import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { store, waitForHydration } from './store'

waitForHydration(store)
  .then(() => store.dispatch.auth.initialToken())
  .then(() => store.dispatch.auth.fetchUser())
  .then(() => store.dispatch.spotifyPlayer.initSdk(store))
  .catch(error => console.error('Login failed!', error))
  .then(() => {
    render(<App store={store} />, document.querySelector('#app'))
  })
