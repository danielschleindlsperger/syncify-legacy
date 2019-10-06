import SpotifyWebApi from 'spotify-web-api-node'
import { Config } from '../../../config'

export type SpotifyOAuthResponse = {
  access_token: string
  token_type: 'Bearer'
  expires_in: number
  refresh_token: string
  scope: string
}

export type SpotifyCredentials = {
  clientId: string
  clientSecret: string
  redirectUri: string
  accessToken?: string
  refreshToken?: string
}

export type SpotifyUserImage = {
  height: number
  url: string
  width: number
}

export type SpotifyUserDto = {
  birthdate: string
  country: string
  display_name: string
  email: string
  external_urls: {
    spotify: string
  }
  followers: {
    href?: string | null
    total: number
  }
  href: string
  id: string
  images: SpotifyUserImage[]
  product: 'premium' | 'free' | 'open'
  type: 'user'
  uri: string
}

const { clientId, clientSecret, redirectUri } = Config.spotify

export const spotifyFactory = (credentials: Partial<SpotifyCredentials> = {}) =>
  new SpotifyWebApi({
    clientId,
    clientSecret,
    redirectUri,
    ...credentials,
  })
