import React from 'react'
import { storiesOf } from '@storybook/react'
import { StyledPlayer, PlayerPlaceholder } from './Player'
import { ProgressBar } from './ProgressBar'

const playerStories = storiesOf('Player', module)

playerStories.add('placeholder', () => <PlayerPlaceholder />)

const playerProps = {
  songName: 'Lazaretto',
  artistName: 'Jack White',
  coverArt: 'https://i.scdn.co/image/28c308bba914be736338b7617335ae08b36c8989',
}

playerStories.add('player', () => <StyledPlayer {...playerProps} />)

playerStories.add('progressbar', () => (
  <div
    style={{
      position: 'relative',
      width: 300,
      height: 300,
      backgroundColor: 'lightgrey',
    }}
  >
    <ProgressBar duration={1000 * 60 * 3} position={1000 * 60} />
  </div>
))
