import { Config, EnvValue } from 'type-env'

@Config
export class SpotifyConfig {
  @EnvValue('SPOTIFY_CLIENT_ID')
  clientId: string = ''

  @EnvValue('SPOTIFY_CLIENT_SECRET')
  clientSecret: string = ''

  @EnvValue('SPOTIFY_REDIRECT_URL')
  redirectUri: string = 'http://localhost:8080/api/auth/callback'
}

export const spotify = new SpotifyConfig()
