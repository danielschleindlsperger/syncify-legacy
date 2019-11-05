import React from 'react'
import { storiesOf } from '@storybook/react'
import { Player } from './player'

const song1 = {
  songName: 'The Wreck of Edmund Fitzgerald',
  artists: ['Gordon Lightfoot'],
  coverArt: 'https://i.scdn.co/image/ab67616d0000b273d9088b1e7d1f82db2a0f3d54',
  duration: 223170,
  position: 220000,
}

const song2 = {
  songName: 'Nein! (feat. Doreen)',
  artists: ['Sido', 'Doreen'],
  coverArt: 'https://i.scdn.co/image/ab67616d0000b27348b33c6462ec8184a38d8a4e',
  duration: 319312,
  position: 0,
}

const SongChanger = () => {
  const [song, setSong] = React.useState(song1)

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setSong(song2)
    }, song1.duration - song1.position)

    return () => window.clearTimeout(id)
  }, [])

  return <Player {...song} />
}

storiesOf('Player', module)
  .add('playing', () => (
    <Player
      songName="The Wreck of Edmund Fitzgerald"
      artists={['Gordon Lightfoot']}
      coverArt="https://i.scdn.co/image/ab67616d0000b273d9088b1e7d1f82db2a0f3d54"
      duration={223170}
      position={102000}
    />
  ))

  .add('multiple artists', () => (
    <Player
      songName="Nein! (feat. Doreen)"
      artists={['Sido', 'Doreen']}
      coverArt="https://i.scdn.co/image/ab67616d0000b27348b33c6462ec8184a38d8a4e"
      duration={319312}
      position={311242}
    />
  ))
  .add('song change', () => <SongChanger />)
