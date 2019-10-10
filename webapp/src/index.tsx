import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { room } from './mock-data'
import { App } from './components/app'

const client = new ApolloClient({
  // resolvers: {
  //   Query: {
  //     getRoom: () => room,
  //   },
  //   Room: {
  //     id: () => room.id,
  //     name: () => room.name,
  //     description: () => room.description,
  //     playlist: () => room.playlist,
  //     createdAt: () => room.createdAt,
  //     updatedAt: () => room.updatedAt,
  //   },
  // },
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#app'),
)
