import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { store } from './store'

// wait one microtask for the rematch persist plugin to rehydrate auth state
Promise.resolve()
  .then(() => store.dispatch.auth.initialToken())

  .then(async () => {
    // we init pusher and fetch user in parallel i hope
    store.dispatch.room.initPusher()
    await store.dispatch.auth.fetchUser()
    store.dispatch.spotifyPlayer.initSdk(store)
  })
  .catch(error => console.warn('Login failed.', error))
  .then(() => {
    render(<App store={store} />, document.querySelector('#app'))
  })
