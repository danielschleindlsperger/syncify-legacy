import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { store, waitForHydration } from './store'
import { viewAccessToken } from './store/lenses'
import { initSpotifySdk } from './modules/spotify-sdk'
import io from 'socket.io-client'

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

const socket = io('http://localhost:3333/rooms', {
  path: '/real-time',
})

socket.emit('join-room', {
  username: 'Daniel Schleindlsperger',
  userId: 'daniel-schleindlsperger',
  roomId: 'abc',
})

socket.on('user-list', userList => {
  console.log(`currently connected users in room:`, userList)
})

socket.on('song-change', newSong => {
  const { id } = newSong
  console.log(`Playing new song ${id}`)
})
