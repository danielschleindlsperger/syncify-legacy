import { playlist } from './mock-playlist'
import { Room } from '../__generated__/graphql'

const playlistSeed = [
  { name: 'Omnia', description: 'all of my playlists, CDs and whatever, in one playlist' },
  { name: 'LORE ⚔️', description: 'folk metal' },
  { name: 'no feels', description: 'music that has that kind of numb atmosphere' },
  { name: 'Edicabaee', description: 'epic & melodic metal' },
  { name: 'File//2011-2015', description: 'all the music I listened to in that period' },
  {
    name: 'When Angels Fall',
    description: 'songs that are like “When Angels Fall” by Beyond The Black',
  },
  { name: 'hedobang', description: 'metal that you can headbang to' },
  { name: 'for him :3', description: 'a reccomend list for my bf' },
  { name: 'cleanup', description: 'for cleaning up my room' },
  { name: 'God is a woman', description: 'female fronted hard rock & metal' },
  { name: 'good albums ', description: 'rock/metal albums where the entire album is good' },
  { name: 'inner viking', description: 'viking metal' },
  { name: 'Uptemp', description: 'uptemp rock/alternative/indie' },
  { name: 'mixed', description: 'a mix of alternative, indie and nu rock' },
  { name: 'I refuse to cut my hair', description: 'metal/rock/punk by long haired guys' },
  {
    name: 'FATAL quiet BOLD',
    description: 'this is really difficult to describe with a genre (check it out)',
  },
  { name: 'punk i guess', description: 'a mix of 1999 Halestorm, Suzi Quattro and rough punk' },
  { name: 'Play It Cool', description: 'sad teen pop, especially Girli and Allie X' },
  { name: 'seriously?', description: 'a playlist with some weird songs' },
  { name: 'write', description: 'house/EDM music with no lyrics' },
  { name: 'some of this', description: 'gaming music' },
  { name: 'The Stuff', description: 'Extented' },
  {
    name: 'strange',
    description:
      'music from Stranger Things, Black Mirror San Junipeiro and just in general music like that',
  },
  { name: 'AUSRADIEREN', description: 'also gaming music' },
  {
    name: 'STM',
    description: 'a playlist dedicated to my friend Mie, who always wants to control the aux',
  },
  { name: '|Molly Marais|', description: 'a pop playlist for the shop I work in' },
  { name: 'basstest', description: 'songs with a dominant bass' },
  { name: 'øregodter', description: 'translates to “Ear Goods”, music that just sounds beautiful' },
  { name: 'chill down for a moment', description: 'chill music' },
  { name: 'a tiny feeling', description: 'dodie, tessa violet, billie eilish, and such' },
  { name: '2 my soul', description: 'mellow house, sounds really calming' },
  { name: 'a high feeling', description: 'when you listen to this playlist, it’s like being high' },
  { name: 'Nood gight and tleep sight', description: 'veeeery calming music' },
  { name: 'big pile o’chill', description: 'a long playlist for relaxing' },
  { name: 'Hjul', description: 'my christmas playlist' },
]

export const room: Room = {
  id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  name: 'LORE ⚔️',
  description: 'all of my playlists, CDs and whatever, in one playlist',
  playlist,
  createdAt: new Date('2019-01-24T19:40:47.713Z').toISOString(),
  updatedAt: new Date('2019-02-05T21:17:37.713Z').toISOString(),
}
