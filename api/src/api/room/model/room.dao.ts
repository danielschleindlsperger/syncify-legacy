import { getRepository } from 'typeorm'
import { from } from 'rxjs'
import { Room, ROOM_LIST_FIELDS } from './room'

export const RoomDAO = {
  all: () =>
    from(
      getRepository('room').find({
        select: ROOM_LIST_FIELDS,
        order: { createdAt: 'DESC' },
      }),
    ),
  findOne: (id: string) =>
    from(
      getRepository('room').findOne({
        where: { id },
        relations: ['listeners'],
      }),
    ),
  save: (room: Room) => from(getRepository('room').save(room)),
}
