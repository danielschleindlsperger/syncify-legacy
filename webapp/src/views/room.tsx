import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetRoomQuery } from '../__generated__/graphql'
import { useParams } from 'react-router'
import { Flex, Heading, Text } from 'rebass'
import { useSpotifyPlayer } from '../components/spotify-player/spotify-player'
import { Player } from '../components/spotify-player'

type Room = import('../__generated__/graphql').Room

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

  console.log({ playbackState })

  let player: JSX.Element | null = null

  if (playbackState) {
    const {
      duration,
      position,
      track_window: { current_track },
    } = playbackState
    const artists = current_track.artists.map(a => a.name)
    const coverArt = current_track.album.images[0].url
    const songName = current_track.name
    player = (
      <Player
        artists={artists}
        songName={songName}
        coverArt={coverArt}
        duration={duration}
        position={position}
        css={{ margin: '20px' }}
      />
    )
  }

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <RoomHeader
        css={{ maxWidth: '600px', margin: '60px auto' }}
        name={room.name}
        description={room.description}
      />
      <Flex mt="auto" justifyContent="center">
        {player}
      </Flex>
    </Flex>
  )
}

type RoomHeaderProps = React.HTMLProps<HTMLElement> & Pick<Room, 'name' | 'description'>

const RoomHeader = ({ name, description, ...props }: RoomHeaderProps) => (
  <header {...props}>
    <Heading fontSize={6} mt={4}>
      {name}
    </Heading>
    {description && <Text fontSize={4}>{description}</Text>}
  </header>
)
