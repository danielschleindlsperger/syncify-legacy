import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetRoomQuery } from '../__generated__/graphql'
import { useParams } from 'react-router'

const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
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

  if (!data || !data.getRoom) return <RoomDoesNotExist />

  const room = data.getRoom

  return (
    <div>
      <h1>Hello</h1>
      <div>{room.id}</div>
      <div>{room.name}</div>
      <div>{room.description}</div>
      <div>{room.playlist.playbackStatus}</div>
    </div>
  )
}
