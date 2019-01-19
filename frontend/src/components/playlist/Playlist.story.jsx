import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Playlist } from './Playlist'

const stories = storiesOf('Playlist', module)

const playlist = [
  {
    name: 'Big Attack',
    artists: 'Beatsteaks',
    album: 'Smacksmash',
    id: '123asf89as9fd',
    imageUrl: 'https://i.scdn.co/image/296b11cb644ce7091c62a65585dfbb5a5fd74c45',
  },
  {
    name: "Mietzie's Song",
    artists: 'Beatsteaks',
    album: 'Launched',
    id: 'asdfasfasfsfsfs',
    imageUrl: 'https://i.scdn.co/image/a75587ab7e5b469fd8aa18726dd0324ef72f2fa0',
  },
  {
    name: 'George Costanza',
    artists: 'Bluejuice',
    album: 'Retrospectable',
    id: 'ssslslsl',
    imageUrl: 'https://i.scdn.co/image/296b11cb644ce7091c62a65585dfbb5a5fd74c45',
  },
  {
    name: 'Big Attack',
    artists: 'Beatsteaks',
    album: 'Smacksmash',
    id: 'asflkjasldfas',
    imageUrl: 'https://i.scdn.co/image/a75587ab7e5b469fd8aa18726dd0324ef72f2fa0',
  },
  {
    name: 'George Costanza',
    artists: 'Bluejuice',
    album: 'Retrospectable',
    id: 'siofoaisf',
    imageUrl: 'https://i.scdn.co/image/296b11cb644ce7091c62a65585dfbb5a5fd74c45',
  },
  {
    name: "Mietzie's Song with a very, very, very, very long Title",
    artists: 'Beatsteaks from Hell',
    album: 'Launched',
    id: 'sksksksksk',
    imageUrl: 'https://i.scdn.co/image/a75587ab7e5b469fd8aa18726dd0324ef72f2fa0',
  },
]

stories.add('empty playlist', () => <Playlist playlist={[]} onSongSelect={() => {}} />)

stories.add('with songs', () => (
  <Playlist playlist={playlist} style={{ margin: '0 auto' }} onSongSelect={action('select song')} />
))
