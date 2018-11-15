import { EntitySchema } from 'typeorm'
import { User } from './user'
import { entityWithoutFields } from '../../../util'

export const UserEntity = new EntitySchema<User>({
  name: 'user',
  columns: {
    // spotify id as primary key
    id: {
      type: 'varchar',
      primary: true,
    },
    name: {
      type: 'varchar',
    },
    avatar: {
      type: 'varchar',
    },
    accessToken: {
      type: 'varchar',
    },
    refreshToken: {
      type: 'varchar',
    },
    deviceId: {
      type: 'varchar',
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
    room: {
      type: 'many-to-one',
      target: 'room',
    },
  },
})

export const SECURED_FIELDS = entityWithoutFields(['refreshToken'])(UserEntity)

export const PUBLIC_FIELDS = entityWithoutFields(['refreshToken', 'accessToken', 'updatedAt'])(
  UserEntity,
)
