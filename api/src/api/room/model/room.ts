import { User } from '../../user'
import { RoomEntity } from './room.entity'
import { entityWithoutFields } from '../../../util'

export interface Track {
  spotifyUri: string
  isActive: boolean
}

export interface Room {
  id?: string
  name: string
  coverArt?: string
  playlist: Track[]
  listeners: User[]
  createdAt?: string
  updatedAt?: string
}

// room fields in a list context, i.e. without too specific fields
export const ROOM_LIST_FIELDS = entityWithoutFields(['playlist'])(RoomEntity)
