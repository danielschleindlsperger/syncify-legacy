import { EntitySchema } from 'typeorm'
import { Room } from './room'

export const RoomEntity = new EntitySchema<Room>({
  name: 'room',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
    },
    coverArt: {
      type: 'varchar',
      nullable: true,
    },
    playlist: {
      type: 'simple-array',
    },
  },
  relations: {
    listeners: {
      type: 'one-to-many',
      target: 'user',
      inverseSide: 'room',
    },
  },
})
