import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetRoomQuery } from '../__generated__/graphql'
import { useParams } from 'react-router'
import { Box } from 'rebass'

const GET_ROOM = gql`
  query getRoom($id: ID!) {
    room(id: $id) {
      id
      name
      description
      playlist {
        playbackStatus
      }
    }
  }
`

const RoomDoesNotExist = () => <div>Room does not exist :(</div>

export const Room = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery<GetRoomQuery>(GET_ROOM, {
    variables: { id },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>

  if (!data || !data.room) return <RoomDoesNotExist />

  const room = data.room

  return (
    <Box bg="green">
      <h1>Hello</h1>
      <div>{room.id}</div>
      <div>{room.name}</div>
      <div>{room.description}</div>
      <div>{room.playlist.playbackStatus}</div>
    </Box>
  )
}
