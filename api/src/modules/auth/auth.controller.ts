import { Controller, Get, Res, Query, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/login')
  login(@Res() res: any) {
    res.redirect(this.authService.authorizationUrl());
  }

  @Get('/test')
  test() {
    return 'authenticated.';
  }

  @Get('/callback')
  async callback(@Res() res: any, @Query('code') code?: AuthorizationCode) {
    const tokens: Tokens = await this.authService
      .tradeCodeForTokens(code)
      .catch(() => {
        throw new BadRequestException('No code retrieved from Spotify callback.');
      });

    const spotifyUser = await this.authService.getUser(tokens.access_token);

    const userDto = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: (Date.now() / 1000) + tokens.expires_in,
      name: spotifyUser.display_name,
      id: spotifyUser.id,
      avatarUrl: spotifyUser.images[0].url,
    };

    const user = await this.userService.save(userDto);
    const token = this.authService.signIn(user);
    res.redirect(`http://localhost:8080/app?token=${token}`);
  }
}