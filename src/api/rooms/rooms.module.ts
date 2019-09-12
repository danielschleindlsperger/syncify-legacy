import { Module } from '@nestjs/common'
import { RoomsController } from './rooms.controller'
import { PrismaModule } from '../prisma'

@Module({
  imports: [PrismaModule],
  controllers: [RoomsController],
})
export class RoomsModule {}
