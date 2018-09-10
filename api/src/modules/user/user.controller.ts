import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  all() {
    return this.userService.findAll();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.userService.find(id).catch(() => {
      throw new NotFoundException('No user found.');
    });
  }
}
