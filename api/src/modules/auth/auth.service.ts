import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as SpotifyWebApi from 'spotify-web-api-node';
import { prop } from 'ramda';
import { UserService } from '../user/user.service';
import { spotifyScopes } from './spotify-scopes';

@Injectable()
export class AuthService {
  spotifyApi = new SpotifyWebApi({
    clientId: 'b7fbf01f209d452b89428414609933f3',
    clientSecret: '2aa8a61ce8bb4c3eb3d8a5b121b19915',
    redirectUri: 'http://localhost:3000/auth/callback',
  });

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

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
