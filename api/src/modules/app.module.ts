import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { ConfigModule } from 'modules/config/config.module';
import { RoomModule } from 'modules/room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    RoomModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 4000,
      username: 'root',
      password: 'root',
      database: 'syncify',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
