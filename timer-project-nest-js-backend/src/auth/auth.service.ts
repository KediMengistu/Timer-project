import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { VerificationService } from '../verification/verification.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserSignUpDto } from '../users/dto/create-user-sign-up.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { VerificationActions } from '../verification/enums/verification-actions.enums';
import { UserVerificationStatus } from '../users/enums/user-verification-status.enum';
import { BadRequestException } from '../exception/bad-request.exception';
import { UnauthorizedException } from '../exception/unauthorized.exception';
import { QueryFailedError } from 'typeorm';
import { VerifyUserSignUpDTO } from '../users/dto/verify-user-sign-up.dto';
import { VerifyUserForgotPasswordDTO } from '../users/dto/verify-user-forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private verificationService: VerificationService,
    private jwtService: JwtService,
  ) {}

  async signup(
    createUserSignUpDto: CreateUserSignUpDto,
  ): Promise<{ userId: string }> {
    try {
      let salt: string = await bcrypt.genSalt(10);
      const hashedPassword: string = await bcrypt.hash(
        createUserSignUpDto.password,
        salt,
      );
      const savedUser: User = await this.usersService.createUser({
        ...createUserSignUpDto,
        password: hashedPassword,
      });
      await this.verificationService.initiateVerification(
        savedUser,
        VerificationActions.INITIATE_SIGN_UP,
      );
      return { userId: savedUser.id };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException('User account exists.');
      } else {
        throw error;
      }
    }
  }

  async verifySignup(
    verifyUserSignUpDTO: VerifyUserSignUpDTO,
  ): Promise<{ access_token: string }> {
    const user: User = await this.usersService.retrieveUserViaId(
      verifyUserSignUpDTO.userId,
    );
    await this.verificationService.completeVerification(
      user,
      verifyUserSignUpDTO.inputVerificationCode,
    );
    const access_token_obj: { access_token: string } = await this.signin(
      user.id,
    );
    return access_token_obj;
  }

  async signin(userId: string): Promise<{ access_token: string }> {
    const user: User = await this.usersService.retrieveUserViaId(userId);
    if (
      user.verificationCode !== null ||
      user.verificationCodeExpireTime !== null
    ) {
      this.usersService.updateUserVerficationProps(
        userId,
        null,
        null,
        user.isVerified,
      );
    }
    await this.usersService.updateSignInAndExpirationTime(userId);
    //input user credentials are valid - generate JWT.
    const payload = { sub: userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.retrieveUserViaEmail(email);
    //user does not exist - exit.
    if (!user) {
      throw new UnauthorizedException(
        'Provided email is not associated to any user account.',
      );
    }
    if (user.isVerified === UserVerificationStatus.NOT_VERIFIED) {
      throw new UnauthorizedException(
        'Associated user account is not verified.',
      );
    }
    //validate input user credentials are valid.
    const isMatching: boolean = await bcrypt.compare(password, user.password);
    //input user credentials are invalid.
    if (!isMatching) {
      throw new UnauthorizedException('Provided password is incorrect.');
    }
    return user;
  }

  async forgotPasswordRequest(email: string) {
    const user: User = await this.usersService.retrieveUserViaEmail(email);
    await this.verificationService.initiateVerification(
      user,
      VerificationActions.INITIATE_FORGOT_PASSWORD,
    );
  }

  async forgotPasswordConfirm(
    verifyUserForgotPasswordDTO: VerifyUserForgotPasswordDTO,
  ) {
    const user: User = await this.usersService.retrieveUserViaEmail(
      verifyUserForgotPasswordDTO.email,
    );
    const isMatching: boolean = await bcrypt.compare(
      verifyUserForgotPasswordDTO.newPassword,
      user.password,
    );
    if (isMatching) {
      throw new BadRequestException(
        'Password input was previously used. Please provide a new one.',
      );
    }
    await this.verificationService.completeVerification(
      user,
      verifyUserForgotPasswordDTO.inputVerificationCode,
    );
    let salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(
      verifyUserForgotPasswordDTO.newPassword,
      salt,
    );
    await this.usersService.updateUserPassword(user.id, hashedPassword);
  }
}
