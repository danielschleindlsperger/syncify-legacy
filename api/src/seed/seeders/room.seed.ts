import { Connection } from 'typeorm'
import { Room } from '../../api/room'
import { Seeder } from '../seeder'
import { range } from 'ramda'
import { fakeData } from '../../tests/mocks'

const roomSeed: Partial<Room>[] = range(0, 50).map(() => fakeData())

export const seedRoomTable: Seeder = (connection: Connection) =>
  connection.getRepository('room').save(roomSeed)
