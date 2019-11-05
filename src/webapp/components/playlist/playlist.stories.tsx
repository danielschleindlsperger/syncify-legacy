import { storiesOf } from '@storybook/react'
import React from 'react'
import { Playlist, PlaylistItem } from './playlist'
import { playlist } from '../../../mock-data'
import { take } from 'ramda'

const shortPlaylist = { ...playlist, activeIndex: 0, songs: take(5, playlist.songs) }
const emptyPlaylist = { ...playlist, activeIndex: 0, songs: [] }

storiesOf('Playlist', module)
  .add('Playlist Item ', () => <PlaylistItem song={playlist.songs[2]} isActive={false} />)
  .add('Playlist Item active ', () => <PlaylistItem song={playlist.songs[3]} isActive={true} />)
  .add("lots o' items ", () => <Playlist playlist={playlist} activeSongId={playlist.songs[5].id} />)
  .add('few items ', () => (
    <Playlist playlist={shortPlaylist} activeSongId={shortPlaylist.songs[2].id} />
  ))
