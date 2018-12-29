import React from 'react'
import { render } from 'react-dom'
import { getMyPlaylists } from './api'
import App from './components/App'
import { store, waitForHydration } from './store'
import { viewAccessToken } from './store/lenses'
import { initSpotifySdk } from './modules/spotify-sdk'

window.store = store
waitForHydration(store)
  .then(() => store.dispatch.auth.initialToken())
  .then(() => store.dispatch.auth.fetchUser())
  .then(() => initSpotifySdk({ accessToken: viewAccessToken(store.getState()) }))
  .then(player => store.dispatch.spotifyPlayer.initPlayerState(player))
  .catch(error => console.error('Login failed!', error))
  .then(() => {
    render(<App store={store} />, document.querySelector('#app'))
  })
  .then(() => getMyPlaylists(viewAccessToken(store.getState())).then(console.log))
