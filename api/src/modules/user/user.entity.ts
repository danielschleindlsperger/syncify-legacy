import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './user.interface';

@Entity()
export class UserEntity implements User {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  name: string;

  @Exclude()
  @Column('text')
  accessToken: AccessToken;

  @Exclude()
  @Column('text')
  refreshToken: RefreshToken;

  @Exclude()
  @Column({ unsigned: true, type: 'int' })
  expiresAt: number;

  @Column('text')
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
