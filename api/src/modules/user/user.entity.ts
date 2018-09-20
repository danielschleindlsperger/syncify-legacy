import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.interface';

@Entity()
export class UserEntity implements User {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  name: string;

  @Column('text')
  accessToken: AccessToken;

  @Column('text')
  refreshToken: RefreshToken;

  @Column({ unsigned: true, type: 'int' })
  expiresAt: number;

  @Column('text')
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
