import React from 'react'
import { Box, Text, Flex, BoxProps } from 'rebass'
import { css } from '@emotion/core'

type Playlist = import('../../__generated__/graphql').Playlist
type Song = import('../../__generated__/graphql').Song
type Album = import('../../__generated__/graphql').Album

type PlaylistSong = Pick<Song, 'id' | 'name' | 'artists'> & {
  album: Pick<Album, 'coverArt'>
}

type PlaylistProps = React.HTMLProps<HTMLElement> &
  BoxProps & {
    playlist: {
      songs: PlaylistSong[]
    }
    activeSongId: Song['id'] | null
  }

export const Playlist = ({ playlist, activeSongId, ...props }: PlaylistProps) => {
  return (
    <Box as="ul" {...props}>
      {playlist.songs.map(song => (
        <PlaylistItem key={song.id} song={song} isActive={song.id === activeSongId} />
      ))}
    </Box>
  )
}

type PlaylistItemProps = React.HTMLProps<HTMLElement> &
  BoxProps & {
    song: PlaylistSong
    isActive: boolean
  }

export const PlaylistItem = React.memo(({ song, isActive, ...props }: PlaylistItemProps) => {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (ref.current && isActive) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isActive])

  return (
    <Flex
      ref={ref}
      as="li"
      p={2}
      alignItems="baseline"
      // TODO: check why these items all have different classes with the same css
      css={[
        coverStyle,
        {
          '&:before': {
            backgroundImage: `linear-gradient(to right, #fff 20%, transparent), url(${song.album.coverArt})`,
            filter: isActive ? '' : 'grayscale(1)',
            opacity: isActive ? 1 : 0,
          },
        },
      ]}
      {...props}
    >
      <Text fontSize={4} fontWeight="bold" mr={2}>
        {song.name}
      </Text>
      <Text fontSize={2} mt={2} color="grey">
        {song.artists.map(x => x.name).join(', ')}
      </Text>
    </Flex>
  )
})

const coverStyle = css`
  position: relative;

  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-position: center;
    background-size: cover;
    transition: 'opacity 300ms ease-in';
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }
`
