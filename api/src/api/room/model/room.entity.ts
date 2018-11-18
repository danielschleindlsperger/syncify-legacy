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
    // fixed empty state for this, should be empty array but is actually undefined
    playlist: {
      type: 'simple-array',
      nullable: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
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
