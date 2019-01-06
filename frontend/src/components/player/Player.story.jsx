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
  duration: 1000 * 60 * 3,
  position: 1000 * 60,
}

playerStories.add('player with progressbar', () => <StyledPlayer {...playerProps} />)
