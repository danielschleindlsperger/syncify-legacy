import { Connection } from 'typeorm'
import { Room } from '../../api/room'
import { Seeder } from '../seeder'
import { range } from 'ramda'
import { fakeData } from '../../tests/mocks'

const roomSeed: () => Promise<Partial<Room>>[] = () => range(0, 50).map(() => fakeData())

export const seedRoomTable: Seeder = async (connection: Connection) => {
  const seed = await Promise.all(roomSeed())
  connection.getRepository('room').save(seed)
}
