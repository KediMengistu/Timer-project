import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserSignUpDto } from './dto/create-user-sign-up.dto';
import { UserVerificationStatus } from './enums/user-verification-status.enum';

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

  async updateUserTimerCount(email: string, increaseIsTrueOrDecreaseIsFalse: boolean, currentCount: number) {
    if(increaseIsTrueOrDecreaseIsFalse) {
      await this.usersRepository.update({ email }, { numberOfTimers: (currentCount + 1) });
    }
    else {
      await this.usersRepository.update({ email }, { numberOfTimers: (currentCount - 1) });
    }
  }

  async updateUserVerficationProps(email: string, verificationCode: string, verificationCodeExpireTime: Date, isVerified: UserVerificationStatus = UserVerificationStatus.NOT_VERIFIED) {
    await this.usersRepository.update({ email }, { verificationCode, verificationCodeExpireTime, isVerified });
  }
}