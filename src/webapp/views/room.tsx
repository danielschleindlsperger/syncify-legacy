import React from 'react'
import { useParams } from 'react-router'
import { Flex, Heading, Text, Box, BoxProps } from 'rebass'
import { Player, useSpotifyPlayer, useCurrentSong } from '../components/spotify-player'
import { Playlist } from '../components/playlist'
import { useFetch, FetchError } from 'react-async'
import { RoomApiResponse } from '../../types/api'
import { useAuthHeader } from '../components/auth'
import { CurrentSong } from '../components/spotify-player'
import { config } from '../config'

type Room = import('../../types/room').Room

const RoomNotFound = () => <div>Room does not exist :(</div>

const toUri = (spotifyId: string) => `spotify:track:${spotifyId}`

export const Room = () => {
  const { id } = useParams()
  const { ready, playbackState, play, error: spotifyError } = useSpotifyPlayer()
  const { currentSong } = useCurrentSong()
  const authHeader = useAuthHeader()
  const { data, isPending, error } = useFetch<RoomApiResponse>(`${config.apiUrl}/rooms/${id}`, {
    headers: { Accept: 'application/json', ...authHeader },
  })

  useRoomNameAsDocumentTitle(data && data.data, currentSong)

  React.useEffect(() => {
    if (spotifyError) {
      window.alert(spotifyError)
    }
  }, [spotifyError])

  const notFound = error && error instanceof FetchError && error.response.status === 404

  React.useEffect(() => {
    if (ready === true && data !== undefined) {
      const playlist = data.data.playlist
      if (playlist) {
        const { currentIndex, songs, currentTimeMs } = playlist
        const remainingSongs = songs.slice(currentIndex)
        play(remainingSongs.map(s => toUri(s.id)), currentTimeMs)
      }
    }
  }, [ready, data, play])

  if (isPending) return <div>Loading...</div>
  if (notFound) return <RoomNotFound />
  if (error) return <div>Something went wrong :/</div>

  // we already know data is defined
  const room = data!.data

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

const useRoomNameAsDocumentTitle = (
  room: Room | undefined,
  currentSong: CurrentSong | undefined,
) => {
  // sync song title and room name to document title
  React.useEffect(() => {
    const roomName = room && room.name
    const title = [
      'Syncify',
      currentSong && `- ${currentSong.name}`,
      roomName && `- ${roomName}`,
    ].join(' ')

    document.title = title
  }, [room, currentSong])
}
