import { env } from '../../utils/env'
import { ddb } from '../../clients'
import { Room } from '../../../types/room'
import { room } from '../../../mock-data'

const TableName = env('ROOMS_TABLE_NAME')

async function save(room: Room): Promise<void> {
  await ddb
    .put({
      TableName,
      Item: room,
    })
    .promise()
}

// mock until implemented
async function get(id: Room['id']): Promise<Room | undefined> {
  const Item = room

  return Item as Room | undefined
}

// async function get(id: Room['id']): Promise<Room | undefined> {
//   const { Item } = await ddb
//     .get({
//       TableName,
//       Key: { id },
//     })
//     .promise()

//   return Item as Room | undefined
// }

/**
 * Room Data Access Object
 */
export const RoomDAO = {
  save,
  get,
}
