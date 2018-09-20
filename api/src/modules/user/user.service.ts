import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async find(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ id });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
