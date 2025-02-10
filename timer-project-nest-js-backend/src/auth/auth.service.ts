import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailsService } from '../emails/emails.service';
import { AuthUtility } from './auth.utility';
import { CreateUserSignUpDto } from '../users/dto/create-user-sign-up.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { VerifyUserSignUpDTO } from '../users/dto/verify-user-sign-up.dto';
import { UserVerificationStatus } from 'src/users/enums/user-verification-status.enum';
import { UnauthorizedException } from '../exception/unauthorized.exception';
import { BadRequestException } from '../exception/bad-request.exception';

@Injectable()
export class AuthService {
   constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailsService: EmailsService,
    private usersUtility: AuthUtility,
  ) {}

  async signup(createUserSignUpDto: CreateUserSignUpDto): Promise<{ userId: string, email: string }> {
    let salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(createUserSignUpDto.password, salt);
    const user: User = await this.usersService.createUser({ ...createUserSignUpDto, password: hashedPassword });
    //generate random verfication code string.
    const verificationCode: string = this.usersUtility.generateVerificationCode();
    //send verification email containing verification code.
    await this.emailsService.createAndSendEmail(
      user.email, 
      user.email, 
      'Timer Application Sign Up Verification', 
      `Thank you for signing up with us! Your code to verify your account is ${verificationCode}.`, 
      `
        <p>
          Thank you for signing up with us! Your code to verify your account is ${verificationCode}.
        </p>
      `);
    //generate expiration time for verification code.
    const now: Date = new Date();
    const verificationCodeExpireTime: Date = new Date(now.getTime() + 5 * 60 * 1000);
    //update user entry to store original and transformed verification related data.
    salt = await bcrypt.genSalt(10);
    const hashedVerificationCode: string = await bcrypt.hash(verificationCode, salt);
    await this.usersService.updateUserVerficationProps(user.email, hashedVerificationCode, verificationCodeExpireTime);
    return { userId: user.id, email: user.email };
  }

  async verifySignup(verifyUserSignUpDTO: VerifyUserSignUpDTO): Promise<{ access_token: string}> {
    const user: User = await this.usersService.retreiveUser(verifyUserSignUpDTO.email);
    const now: Date = new Date();
    if (user.verificationCodeExpireTime.getTime() < now.getTime()) {
      await this.usersService.updateUserVerficationProps(user.email, null, null);
      throw new BadRequestException('Verification Code Expired.');
    }
    const isMatching: boolean = await bcrypt.compare(verifyUserSignUpDTO.inputVerificationCode, user.verificationCode);
    if(!isMatching) {
      throw new UnauthorizedException('Provided verification code is incorrect.');
    }
    await this.usersService.updateUserVerficationProps(user.email, null, null, UserVerificationStatus.VERIFIED);
    const access_token_obj: { access_token: string } = await this.signin(user.id, user.email);
    return access_token_obj;
  }

  async signin(userId: string, email: string): Promise<{ access_token: string}> {
    //input user credentials are valid - generate JWT.
    const payload = { sub: userId, username: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.retreiveUser(email);
    //user does not exist - exit.
    if(!user) {
      throw new UnauthorizedException('Provided email is not associated to any user account.');
    }
    //validate input user credentials are valid.
    const isMatching: boolean = await bcrypt.compare(password, user.password);
    //input user credentials are invalid.
    if(!isMatching) {
      throw new UnauthorizedException('Provided password is incorrect.');
    }
    return user;
  }
}