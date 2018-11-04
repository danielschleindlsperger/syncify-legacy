import React from 'react'
import { render } from 'react-dom'
import { initApi } from './api'
import App from './components/App'
import { initialAuthorization } from './modules/auth'
import { initStore } from './store'
import { initializeSpotifyPlayer } from './modules/spotify-player'

const store = initStore()

initApi(store)

// handles tokens among other stuff
initialAuthorization(store)
  .then(() => initializeSpotifyPlayer(store))
  .catch(error => console.error('Login failed!', error))
  .then(player => {
    render(<App store={store} />, document.querySelector('#app'))
  })
