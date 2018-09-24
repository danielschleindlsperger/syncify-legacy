import { Controller, Get, Param, NotFoundException, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  all() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  show(@Param('id') id: string) {
    return this.userService.find(id).catch(() => {
      throw new NotFoundException('No user found.');
    });
  }
}
