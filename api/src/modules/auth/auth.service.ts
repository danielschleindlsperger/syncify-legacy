import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'modules/config/config.service';
import * as SpotifyWebApi from 'spotify-web-api-node';
import { prop } from 'ramda';
import { UserService } from '../user/user.service';
import { spotifyScopes } from './spotify-scopes';

@Injectable()
export class AuthService {
  // TODO fix type
  spotifyApi: any

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: this.config.spotifyClientId,
      clientSecret: this.config.spotifyClientSecret,
      redirectUri: `${this.config.apiUrl}${this.config.spotifyRedirectUrl}`,
    });
  }

  authorizationUrl(): string {
    return this.spotifyApi.createAuthorizeURL(spotifyScopes);
  }

  tradeCodeForTokens(code: AuthorizationCode): Promise<Tokens> {
    return this.spotifyApi.authorizationCodeGrant(code).then(prop('body'));
  }

  getUser(accessToken: AccessToken): Promise<SpotifyUser> {
    this.spotifyApi.setAccessToken(accessToken);
    return this.spotifyApi.getMe().then(prop('body'));
  }

  signIn(user: any): string {
    return this.jwtService.sign(user);
  }

  async validateUser(payload: any): Promise<any> {
    console.log(payload)
    throw new Error(payload)
    return await this.userService.find(payload.id);
  }
}
