import { getRepository } from 'typeorm'
import { from } from 'rxjs'
import { Room } from './room'
import { PUBLIC_FIELDS } from '../../user'

export const roomDao = {
  all: () => from(getRepository('room').find()),
  findOne: (id: string) =>
    from(getRepository('room').findOne({ where: { id }, relations: ['listeners'] })),
  create: (room: Room) => from(getRepository('room').save(room)),
}
