import React from 'react'
import * as R from 'ramda'
import { render } from 'react-dom'
import App from './components/App'
import { initialAuthorization } from './modules/auth'
import { initStore } from './store'
import { initSpotifySdk } from './modules/spotify-sdk'

const store = initStore()

// handles tokens among other stuff
initialAuthorization(store)
  .then(() => initSpotifySdk(store))
  .catch(() => console.error('Login failed!'))
  .then((player) => {
    render(
      <App store={store} />,
      document.querySelector('#app'),
    )
  })
