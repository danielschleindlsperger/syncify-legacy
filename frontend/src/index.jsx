import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { initialAuthorization } from './modules/auth'
import { initStore } from './store'
import { initSpotifySdk } from './modules/spotify-sdk'

const store = initStore()

// handles tokens among other stuff
initialAuthorization(store)
initSpotifySdk(store)
  .then(() => {
    render(
      <App store={store} />,
      document.querySelector('#app'),
    )
  })
