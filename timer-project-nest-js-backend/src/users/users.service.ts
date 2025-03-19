import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserSignUpDto } from './dto/create-user-sign-up.dto';
import { VerificationService } from '../verification/verification.service';
import { VerificationActions } from '../verification/enums/verification-actions.enums';
import { VerifyUserDeleteDTO } from './dto/verify-user-delete.dto';
import { UnauthorizedException } from 'src/exception/unauthorized.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => VerificationService))
    private verificationService: VerificationService,
  ) {}

  async createUser(createUserSignUpDto: CreateUserSignUpDto): Promise<User> {
    // Email normalization should be done in the auth service before this method is called
    // But we can ensure it's normalized here as a safeguard
    const normalizedUser = {
      ...createUserSignUpDto,
      email: createUserSignUpDto.email.toLowerCase(),
    };

    const user: User = this.usersRepository.create({ ...normalizedUser });
    const savedUser: User = await this.usersRepository.save(user);
    return savedUser;
  }

  async retrieveUserViaId(userId: string): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ id: userId });
    return user;
  }

  async retrieveUserViaEmail(email: string): Promise<User> {
    // Normalize email before querying the database
    const normalizedEmail = email.toLowerCase();
    const user: User = await this.usersRepository.findOneBy({
      email: normalizedEmail,
    });
    return user;
  }

  retrieveAllUsers(): Repository<User> {
    const users: Repository<User> = this.usersRepository;
    return users;
  }

  async updateUserVerficationProps(
    userId: string,
    verificationCode: string,
    verificationCodeExpireTime: Date,
    isVerified: string,
    verificationAction: string,
  ) {
    await this.usersRepository.update(
      { id: userId },
      {
        verificationCode,
        verificationCodeExpireTime,
        isVerified,
        verificationAction,
      },
    );
  }

  async updateSignInAndExpirationTime(userId: string) {
    const previousSigninTime: Date = new Date();
    const userAccountExpirationTime: Date = new Date(
      Date.now() + 15 * 24 * 60 * 60 * 1000,
    );
    await this.usersRepository.update(
      { id: userId },
      {
        previousSigninTime,
        userAccountExpirationTime,
      },
    );
  }

  async updateUserTimerCount(
    userId: string,
    increaseIsTrueOrDecreaseIsFalse: boolean,
    currentCount: number,
  ) {
    if (increaseIsTrueOrDecreaseIsFalse) {
      await this.usersRepository.update(
        { id: userId },
        { numberOfTimers: currentCount + 1 },
      );
    } else {
      await this.usersRepository.update(
        { id: userId },
        { numberOfTimers: currentCount - 1 },
      );
    }
  }

  async updateUserPassword(userId: string, newPassword: string) {
    await this.usersRepository.update(
      { id: userId },
      { password: newPassword },
    );
  }

  async deleteUserRequest(userId: string) {
    const user: User = await this.retrieveUserViaId(userId);
    if (!user) {
      throw new UnauthorizedException(
        'Insufficient user data to peform delete.',
      );
    }
    await this.verificationService.initiateVerification(
      user,
      VerificationActions.INITIATE_DELETE,
    );
  }

  async deleteUserConfirm(
    userId: string,
    verifyUserDeleteDTO: VerifyUserDeleteDTO,
  ) {
    const user: User = await this.retrieveUserViaId(userId);
    if (!user) {
      throw new UnauthorizedException(
        'Insufficient user data to peform delete.',
      );
    }
    await this.verificationService.completeVerification(
      user,
      verifyUserDeleteDTO.inputVerificationCode,
      VerificationActions.INITIATE_DELETE,
    );
    await this.usersRepository.delete({ id: userId });
  }
}
