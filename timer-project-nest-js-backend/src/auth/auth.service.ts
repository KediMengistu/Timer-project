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

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private verificationService: VerificationService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserSignUpDto: CreateUserSignUpDto) {
    try {
      // Normalize email
      const normalizedDTO = {
        ...createUserSignUpDto,
        email: createUserSignUpDto.email.toLowerCase(),
      };

      let salt: string = await bcrypt.genSalt(10);
      const hashedPassword: string = await bcrypt.hash(
        normalizedDTO.password,
        salt,
      );
      const savedUser: User = await this.usersService.createUser({
        ...normalizedDTO,
        password: hashedPassword,
      });
      await this.verificationService.initiateVerification(
        savedUser,
        VerificationActions.INITIATE_SIGN_UP,
      );
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
    // Normalize email
    const normalizedEmail = verifyUserSignUpDTO.email.toLowerCase();

    const user: User =
      await this.usersService.retrieveUserViaEmail(normalizedEmail);

    if (!user) {
      throw new UnauthorizedException('Email not found.');
    }

    const isMatching: boolean = await bcrypt.compare(
      verifyUserSignUpDTO.password,
      user.password,
    );
    if (!isMatching) {
      throw new UnauthorizedException('Provided password is incorrect.');
    }
    await this.verificationService.completeVerification(
      user,
      verifyUserSignUpDTO.inputVerificationCode,
      VerificationActions.INITIATE_SIGN_UP,
    );
    const access_token_obj: { access_token: string } = await this.signin(
      user.id,
    );
    return access_token_obj;
  }

  async signin(userId: string): Promise<{ access_token: string }> {
    const user: User = await this.usersService.retrieveUserViaId(userId);
    if (!user) {
      throw new UnauthorizedException('Email not found.');
    }
    await this.usersService.updateSignInAndExpirationTime(user.id);
    //input user credentials are valid - generate JWT.
    const payload = { sub: userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    // Normalize email
    const normalizedEmail = email.toLowerCase();

    const user: User =
      await this.usersService.retrieveUserViaEmail(normalizedEmail);
    //user does not exist - exit.
    if (!user) {
      throw new UnauthorizedException('Email not found.');
    }
    //validate input user credentials are valid.
    const isMatching: boolean = await bcrypt.compare(password, user.password);
    //input user credentials are invalid.
    if (!isMatching) {
      throw new UnauthorizedException('Provided password is incorrect.');
    }
    if (user.isVerified === UserVerificationStatus.NOT_VERIFIED) {
      throw new UnauthorizedException(
        'Associated user account is not verified.',
      );
    }
    return user;
  }
}
