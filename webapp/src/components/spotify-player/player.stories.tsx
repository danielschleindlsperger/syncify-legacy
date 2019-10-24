import React from 'react'
import { storiesOf } from '@storybook/react'
import { Player } from './player'

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
