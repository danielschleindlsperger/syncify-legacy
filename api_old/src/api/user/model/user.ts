import { Room } from '../../room'

export interface User {
  id: string
  name: string
  avatar?: string
  accessToken: string
  refreshToken: string
  deviceId?: string
  room?: Room
  createdAt?: string
  updatedAt?: string
}
