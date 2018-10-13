import { EntitySchema } from 'typeorm'
import { omit, pipe } from 'ramda'
import { User } from './user'
import { entityFields } from '../../../util'

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  columns: {
    // spotify as primary key
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
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
})

export const SECURED_FIELDS = entityFields(['refreshToken'])(UserEntity)

export const PUBLIC_FIELDS = entityFields([
  'refreshToken',
  'accessToken',
  'updatedAt',
])(UserEntity)
