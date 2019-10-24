import { storiesOf } from '@storybook/react'
import React from 'react'
import { Playlist } from './playlist'

storiesOf('Playlist', module)
  .add("lots o' items ", () => <Playlist />)
  .add('few items ', () => <Playlist />)
  .add('empty', () => <Playlist />)
