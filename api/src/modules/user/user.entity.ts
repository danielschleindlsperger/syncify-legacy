import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  constructor(props: User) {
    Object.assign(this, props);
  }

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
