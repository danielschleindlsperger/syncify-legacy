import React from 'react'
import styled from 'styled-components'
import T from 'prop-types'
import { DROP_SHADOWS, GOLDEN_RATIO } from '../style-constants'
import { Text } from '../typography'

const EmptyPlaylist = () => null

const AlbumImage = styled.img`
  display: block;
  height: 50px;
  margin-right: 20px;
`

const PlaylistRow = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  cursor: pointer;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: lightgray;
  }

  &:not(:last-child) {
    &:after {
      content: '';
      width: ${(1 / GOLDEN_RATIO) * 100}%;
      height: 1px;
      background-color: lightgray;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const ActivePlaylistRow = styled(PlaylistRow)`
  background-color: lightgrey;
  &:after {
    content: none !important;
  }
`

const EntryText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
`

const NameEntry = styled(EntryText)`
  width: 40%;
`
const ArtistEntry = styled(EntryText)`
  width: 20%;
`
const AlbumEntry = styled(EntryText)`
  width: 20%;
`

const PlaylistEntry = ({ id, name, album, artists, imageUrl, isActive, ...props }) => {
  const Row = isActive ? ActivePlaylistRow : PlaylistRow
  return (
    <Row isActive={isActive} {...props}>
      <AlbumImage src={imageUrl} alt={album} />
      <NameEntry style={{ width: '40%' }}>{name}</NameEntry>
      <ArtistEntry style={{ width: '20%' }}>{artists}</ArtistEntry>
      <AlbumEntry style={{ width: '20%' }}>{album}</AlbumEntry>
    </Row>
  )
}

const PlaylistWrapper = styled.div`
  box-shadow: ${DROP_SHADOWS.SMALL.normal};
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  overflow-y: scroll;
`

export const Playlist = ({ playlist, currentTrack, onSongSelect, ...props }) =>
  playlist.length > 0 ? (
    <PlaylistWrapper {...props}>
      {playlist.map(song => (
        <PlaylistEntry
          key={song.id}
          isActive={currentTrack && currentTrack.id === song.id}
          onClick={() => onSongSelect(song)}
          {...song}
        />
      ))}
    </PlaylistWrapper>
  ) : (
    <EmptyPlaylist {...props} />
  )

Playlist.propTypes = {
  playlist: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      name: T.string.isRequired,
      album: T.string.isRequired,
      artists: T.string.isRequired,
      imageUrl: T.string.isRequired,
      isActive: T.bool.isRequired,
    }),
  ).isRequired,
  onSongSelect: T.func.isRequired,
  currentTrack: T.shape({ id: T.string.isRequired }),
}
