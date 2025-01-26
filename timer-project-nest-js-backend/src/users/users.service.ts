import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserSignUpDto } from './dto/create-user-sign-up.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(createUserSignUpDto: CreateUserSignUpDto): Promise<User> {
    const user: User = this.usersRepository.create({ ...createUserSignUpDto });
    const savedUser: User = await this.usersRepository.save(user); 
    return savedUser;
  }

  retreiveUser(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }
}
