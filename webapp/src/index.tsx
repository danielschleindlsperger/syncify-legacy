import React from 'react'
import { render } from 'react-dom'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import { getRoomQuery } from './__generated__/getRoomQuery'

const GET_ROOM = gql`
  query getRoom($id: ID!) {
    getRoom(id: $id) {
      id
      name
    }
  }
`

function App() {
  const { loading, error, data } = useQuery<getRoomQuery>(GET_ROOM, {
    variables: { id: '18f5609c-53df-4b87-86d2-c6d0b660c2df' },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>

  return (
    <div>
      <h1>Hello</h1>
      <div>{data.getRoom.id}</div>
      <div>{data.getRoom.name}</div>
    </div>
  )
}

const client = new ApolloClient()

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.querySelector('#app'),
)
