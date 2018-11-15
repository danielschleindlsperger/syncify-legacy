import { User } from '../../user'
import { Playlist } from './playlist'
import { RoomEntity } from './room.entity'
import { entityWithoutFields } from '../../../util'

export interface Room {
  id?: string
  name: string
  coverArt?: string
  playlist: Playlist
  listeners: User[]
}

// room fields in a list context, i.e. without too specific fields
export const ROOM_LIST_FIELDS = entityWithoutFields(['playlist'])(RoomEntity)
