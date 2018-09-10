import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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