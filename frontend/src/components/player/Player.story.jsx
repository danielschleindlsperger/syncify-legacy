import React from 'react'
import { storiesOf } from '@storybook/react'
import { Player } from './Player'

const playerStories = storiesOf('Player', module)

playerStories.add(
  'without active song',
  () => <Player />
)

const playerProps = {
  songName: 'Lazaretto',
  artistName: 'Jack White',
  coverArt: 'https://i.scdn.co/image/28c308bba914be736338b7617335ae08b36c8989',
}

playerStories.add(
  'with active song',
  () => <Player {...playerProps} />
)