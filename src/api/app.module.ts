import { Module } from '@nestjs/common'
import { RoomsModule } from './rooms'
import { PrismaModule } from './prisma'

@Module({
  imports: [RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
