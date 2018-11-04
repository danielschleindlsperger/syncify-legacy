import { EntitySchema } from 'typeorm'
import { Room } from './room'

export const RoomEntity = new EntitySchema<Room>({
  name: 'Room',
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
  },
})
