import { Connection } from 'typeorm'
import { Room } from '../api/room'
import { Seeder } from './seeder'

const roomSeed: Room[] = [
  { name: 'MILLERMACMACMILLERMAC' },
  { name: 'Best of EARTHGANG' },
  { name: 'Beats to think to' },
  { name: 'Kabinenparty' },
  { name: 'Moschen' },
  { name: 'TechnoBunker' },
  { name: 'Deep Listening' },
  { name: 'Gang Shit Homie' },
]

export const seedRoomTable: Seeder = (connection: Connection) =>
  connection.getRepository('Room').save(roomSeed)
