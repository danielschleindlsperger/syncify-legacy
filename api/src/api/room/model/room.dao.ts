import { getRepository } from 'typeorm'
import { from } from 'rxjs'
import { Room } from './room'

export const roomDao = {
  all: () => from(getRepository('Room').find()),
  create: (room: Room) => from(getRepository('Room').save(room)),
}
