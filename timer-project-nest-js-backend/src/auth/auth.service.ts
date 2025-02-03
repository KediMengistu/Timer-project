import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserSignUpDto } from '../users/dto/create-user-sign-up.dto';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '../exception/unauthorized.exception';

@Injectable()
export class AuthService {
   constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signup(createUserSignUpDto: CreateUserSignUpDto): Promise<{ user: User, access_token_obj: { access_token: string} }> {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(createUserSignUpDto.password, salt);
    const user: User = await this.usersService.createUser({ ...createUserSignUpDto, password: hashedPassword });
    const tokenPlaceHolderObject: { access_token: string } = await this.signin(user.id, user.email);
    return { user: user, access_token_obj: tokenPlaceHolderObject };
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