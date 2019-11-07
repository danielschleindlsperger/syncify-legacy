export type ApiResponse<T> = {
  data: T
}

export type AuthorizeApiResponse = ApiResponse<{
  spotifyAccessToken: string

  // our own token
  bearerToken: string

  // ISO-8601 date time string
  expires: string
}>
