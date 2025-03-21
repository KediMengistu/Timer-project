import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserSignUpDto } from './dto/create-user-sign-up.dto';
import { VerificationService } from '../verification/verification.service';
import { VerificationActions } from '../verification/enums/verification-actions.enums';
import { VerifyUserDeleteDTO } from './dto/verify-user-delete.dto';
import { UnauthorizedException } from 'src/exception/unauthorized.exception';
import { VerifyUserForgotPasswordDTO } from './dto/verify-user-forgot-password.dto';
import { UserForgotPasswordDTO } from './dto/user-forgot-password.dto';
import { BadRequestException } from 'src/exception/bad-request.exception';
import * as bcrypt from 'bcrypt';

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

  async forgotPasswordRequest(userForgotPasswordDTO: UserForgotPasswordDTO) {
    // Normalize email
    const normalizedEmail = userForgotPasswordDTO.email.toLowerCase();

    const user: User = await this.retrieveUserViaEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedException('Email not found.');
    }
    await this.verificationService.initiateVerification(
      user,
      VerificationActions.INITIATE_FORGOT_PASSWORD,
    );
  }

  async forgotPasswordConfirm(
    verifyUserForgotPasswordDTO: VerifyUserForgotPasswordDTO,
  ) {
    // Normalize email
    const normalizedEmail = verifyUserForgotPasswordDTO.email.toLowerCase();

    const user: User = await this.retrieveUserViaEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedException('Email not found.');
    }
    const isMatching: boolean = await bcrypt.compare(
      verifyUserForgotPasswordDTO.newPassword,
      user.password,
    );
    if (isMatching) {
      throw new BadRequestException(
        'Password was previously used. Please provide a different one.',
      );
    }
    await this.verificationService.completeVerification(
      user,
      verifyUserForgotPasswordDTO.inputVerificationCode,
      VerificationActions.INITIATE_FORGOT_PASSWORD,
    );
    let salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(
      verifyUserForgotPasswordDTO.newPassword,
      salt,
    );
    await this.updateUserPassword(user.id, hashedPassword);
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
