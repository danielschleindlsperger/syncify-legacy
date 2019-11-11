import { Room } from './room'

// All of the REST API responses to be used by server and client implementation

export type ApiResponse<T = any> = {
  data: T
}

export type AuthorizeApiResponse = ApiResponse<{
  spotifyAccessToken: string

  // our own token
  bearerToken: string

  // ISO-8601 date time string
  expires: string
}>

export type RoomApiResponse = ApiResponse<Room>
