import { Controller, Get, Param, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  all() {
    return this.userService.findAll();
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req) {
    return req.user;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  show(@Param('id') id: string) {
    return this.userService.find(id).catch(() => {
      throw new NotFoundException('No user found.');
    });
  }
}
