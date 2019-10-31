import { User } from '../../__generated__/graphql'

export type DatabaseUser = User & {
  accessToken: string
  refreshToken: string
}
