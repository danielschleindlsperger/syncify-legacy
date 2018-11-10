import { User } from '../../user'

export interface Room {
  id?: string
  name: string
  coverArt?: string
  listeners: User[]
}
