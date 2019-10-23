import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetRoomQuery } from '../__generated__/graphql'
import { useParams } from 'react-router'
import { Box, Button } from 'rebass'
import { useSpotifyPlayer } from '../components/spotify-player/spotify-player'

const GET_ROOM = gql`
  query getRoom($id: ID!) {
    room(id: $id) {
      id
      name
      description
      playlist {
        playbackStatus
        currentIndex
        currentTimeMs
        playbackStatus
        songs {
          id
        }
      }
    }
  }
`

const RoomDoesNotExist = () => <div>Room does not exist :(</div>

const toUri = (spotifyId: string) => `spotify:track:${spotifyId}`

export const Room = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery<GetRoomQuery>(GET_ROOM, {
    variables: { id },
  })
  const { ready, playbackState, play } = useSpotifyPlayer()

  React.useEffect(() => {
    if (ready === true && data !== undefined) {
      const playlist = data.room && data.room.playlist
      if (playlist) {
        const { currentIndex, songs, currentTimeMs } = playlist
        const remainingSongs = songs.slice(currentIndex)
        play(remainingSongs.map(s => toUri(s.id)), currentTimeMs)
      }
    }
  }, [ready, data, play])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error}</div>

  if (!data || !data.room) return <RoomDoesNotExist />

  const room = data.room

  return (
    <Box>
      <h1>Hello</h1>
      <div>Player {ready ? 'ready' : 'not ready'}!</div>
      {playbackState && <img src={playbackState.track_window.current_track.album.images[0].url} />}
      <div>{room.id}</div>
      <div>{room.name}</div>
      <div>{room.description}</div>
      <div>{room.playlist.playbackStatus}</div>
    </Box>
  )
}
