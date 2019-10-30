import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GetRoomQuery } from '../__generated__/graphql'
import { useParams } from 'react-router'
import { Flex, Heading, Text, Box, BaseProps, BoxProps } from 'rebass'
import { Player, useSpotifyPlayer, useCurrentSong } from '../components/spotify-player'
import { Playlist } from '../components/playlist'

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
          name
          artists {
            id
            name
          }
          album {
            coverArt
          }
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
  const { ready, playbackState, play, error: spotifyError } = useSpotifyPlayer()
  const { currentSong } = useCurrentSong()

  React.useEffect(() => {
    if (spotifyError) {
      window.alert(spotifyError)
    }
  }, [spotifyError])

  // sync song title and room name to document title
  React.useEffect(() => {
    const roomName = data && data.room && data.room.name
    const title = [
      'Syncify',
      currentSong && `- ${currentSong.name}`,
      roomName && `- ${roomName}`,
    ].join(' ')

    document.title = title
  }, [data, currentSong])

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
    <Flex minHeight="100vh" flexDirection="column">
      <RoomHeader
        maxWidth="600px"
        m="60px auto"
        css={{ maxWidth: '600px', margin: '60px auto' }}
        name={room.name}
        description={room.description}
      />
      <Playlist
        mx="auto"
        maxHeight="50vh"
        overflow="auto"
        playlist={room.playlist}
        activeSongId={playbackState ? playbackState.track_window.current_track.id : null}
      />
      <Flex mt="auto" justifyContent="center">
        {currentSong && (
          <Player
            artists={currentSong.artists.map(a => a.name)}
            songName={currentSong.name}
            coverArt={currentSong.album.images[0].url}
            duration={currentSong.duration}
            position={currentSong.position}
            css={{ margin: '20px' }}
          />
        )}
      </Flex>
    </Flex>
  )
}

type RoomHeaderProps = React.HTMLProps<HTMLElement> & BoxProps & Pick<Room, 'name' | 'description'>

const RoomHeader = ({ name, description, ...props }: RoomHeaderProps) => (
  <Box as="header" p={3} {...props}>
    <Heading fontSize={6} mt={4}>
      {name}
    </Heading>
    {description && <Text fontSize={4}>{description}</Text>}
  </Box>
)
