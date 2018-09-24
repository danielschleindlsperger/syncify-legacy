import {
  Controller,
  Get,
  Res,
  Query,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as R from 'ramda';
import { AuthService } from './auth.service';
import { UserService } from 'modules/user/user.service';
import { ConfigService } from 'modules/config/config.service';
import { User } from 'modules/user/user.interface';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/login')
  login(@Res() res: any) {
    res.redirect(this.authService.authorizationUrl());
  }

  @Get('/callback')
  async callback(@Res() res: any, @Query('code') code?: AuthorizationCode) {
    const tokens: Tokens = await this.authService
      .tradeCodeForTokens(code)
      .catch(() => {
        throw new BadRequestException(
          'No code retrieved from Spotify callback.',
        );
      });

    const spotifyUser = await this.authService.getUser(tokens.access_token);

    const userDto: User = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() / 1000 + tokens.expires_in,
      name: spotifyUser.display_name,
      id: spotifyUser.id,
      avatarUrl: spotifyUser.images[0].url,
    };

    const user = await this.userService.save(userDto);
    const token = this.authService.signIn(user);
    res.redirect(`${this.configService.frontendUrl}?token=${token}`);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req) {
    return R.omit(['refreshToken'], req.user);
  }
}
