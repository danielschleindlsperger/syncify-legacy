import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { initialAuthorization } from './modules/auth'
import { initStore } from './store'
import { initializeSpotifyPlayer } from './modules/spotify-player'

const store = initStore()

// handles tokens among other stuff
initialAuthorization(store)
  .then(() => initializeSpotifyPlayer(store))
  .catch(() => console.info('Login failed!'))
  .then((player) => {
    render(
      <App store={store} />,
      document.querySelector('#app'),
    )
  })
