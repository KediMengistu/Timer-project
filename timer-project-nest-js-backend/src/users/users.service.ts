import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserSignUpDto } from './dto/create-user-sign-up.dto';
import { CreateUserSignInDto } from './dto/create-user-sign-in.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  signup(createUserSignUpDto: CreateUserSignUpDto): Promise<User> {
    const user: User = this.usersRepository.create({ ...createUserSignUpDto });
    return this.usersRepository.save(user); 
  }

  signin(createUserSignInDto: CreateUserSignInDto): Promise<User> {
    return this.usersRepository.findOneBy({ email: createUserSignInDto.email });
  }
}
