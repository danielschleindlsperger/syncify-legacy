import { User } from '../../user'
import { RoomEntity } from './room.entity'
import { entityWithoutFields } from '../../../util'

export interface PlaylistTrack {
  // spotify id
  id: string
  durationMs: number
  playbackStartedAt?: number
  isActive: boolean
}

export interface Room {
  id?: string
  name: string
  admins: User[]
  coverArt?: string
  playlist: PlaylistTrack[]
  listeners: User[]
  createdAt?: string
  updatedAt?: string
}

// room fields in a list context, i.e. without too specific fields
export const ROOM_LIST_FIELDS = entityWithoutFields(['playlist'])(RoomEntity)
