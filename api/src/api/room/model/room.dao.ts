import { getRepository } from 'typeorm'
import { from, Observable } from 'rxjs'
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
    from(getRepository('room').findOneOrFail({ where: { id } })) as Observable<Room>,
  save: (room: Room) => from(getRepository('room').save(room)),
}
