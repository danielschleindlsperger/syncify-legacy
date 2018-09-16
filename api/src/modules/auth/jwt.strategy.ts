import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TODO CHANGE SECRET',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
