import { Connection } from 'typeorm'
import { Room } from '../../api/room'
import { Seeder } from '../seeder'
import rooms from './room'

const roomSeed: Room[] = rooms

export const seedRoomTable: Seeder = (connection: Connection) =>
  connection.getRepository('Room').save(roomSeed)
