import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { DatabaseUser } from './database-user'

const stage = process.env.STAGE

const usersTableName = `${stage}-users`

export const User = {
  async save(dynamoClient: DocumentClient, user: DatabaseUser) {
    await dynamoClient
      .put({
        TableName: usersTableName,
        Item: user,
      })
      .promise()
  },
  async get(
    dynamoClient: DocumentClient,
    id: DatabaseUser['id'],
  ): Promise<DatabaseUser | undefined> {
    const { Item } = await dynamoClient
      .get({
        TableName: usersTableName,
        Key: { id },
      })
      .promise()

    return Item as DatabaseUser | undefined
  },
}
