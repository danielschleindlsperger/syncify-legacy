declare module 'spotify-web-api-node';

declare type AuthorizationCode = string;
declare type SpotifyID = string;
declare type SpotifySecret = string;
declare type SpotifyRedirectUrl = string;
declare type SpotifyCode = string;
declare type AccessToken = string;
declare type RefreshToken = string;
declare type TokenType = 'Bearer';
declare type Seconds = number;

declare interface SpotifyCredentials {
  redirectUri?: SpotifyRedirectUrl,
  clientId?: SpotifyID,
  clientSecret?: SpotifySecret,
  accessToken?: AccessToken,
  refreshToken?: RefreshToken,
}

declare interface Tokens {
  access_token: AccessToken;
  refresh_token: RefreshToken;
  token_type: TokenType;
  expires_in: Seconds;
}

declare interface SpotifyUser {
  display_name: string,
  external_urls: {
    spotify: string
  },
  followers: {
    total: number
  },
  email: string,
  href: string,
  id: string,
  images: [
    {
    height?: number,
    url: string,
    width?: null
    }
  ],
  type: string,
  uri: string,
}
