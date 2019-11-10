import { env } from '../../utils/env'
import { ddb } from '../../clients'
import { User } from '../../../types/user'

const TableName = env('USERS_TABLE_NAME')

async function save(user: User): Promise<void> {
  await ddb
    .put({
      TableName,
      Item: user,
    })
    .promise()
}

async function get(id: User['id']): Promise<User | undefined> {
  const { Item } = await ddb
    .get({
      TableName,
      Key: { id },
    })
    .promise()

  return Item as User | undefined
}

/**
 * User Data Access Object
 */
export const UserDAO = {
  save,
  get,
}
