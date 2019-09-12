import { Controller, Get, Param, Post, NotFoundException, Inject } from '@nestjs/common'
import { prismaToken } from '../prisma'
import { Prisma } from '../../generated/prisma-client'

@Controller('rooms')
export class RoomsController {
  constructor(@Inject(prismaToken) private readonly prisma: Prisma) {}
  @Get(':id')
  async get(@Param('id') id: string) {
    const room = await this.prisma.room({ id })

    if (!room) {
      throw new NotFoundException(`Could not find room with id "${id}"`)
    }

    return room
  }

  @Get()
  async getAll() {
    const rooms = await this.prisma.rooms()

    return { rooms }
  }

  @Post()
  create() {
    return {
      id: '1234',
      name: 'Hullebulle',
    }
  }
}
