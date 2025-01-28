import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateUserSignUpDto } from '../users/dto/create-user-sign-up.dto';
import { CreateUserSignInDto } from '../users/dto/create-user-sign-in.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
   constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signup(createUserSignUpDto: CreateUserSignUpDto): Promise<User> {
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(createUserSignUpDto.password, salt);
    const user: User = await this.usersService.createUser({ ...createUserSignUpDto, password: hashedPassword });
    if(!user) {
      return;
    }
    let signInCred: CreateUserSignInDto = new CreateUserSignInDto();
    signInCred.email = user.email;
    signInCred.password = user.password;
    const tokenPlaceHolderObject: { access_token: string} = await this.signin(user.id, signInCred);
    if(!tokenPlaceHolderObject) {
      return;
    }
    return user;
  }

  async signin(userId: string, createUserSignInDto: CreateUserSignInDto): Promise<{ access_token: string}> {
    //input user credentials are valid - generate JWT.
    const payload = { sub: userId, username: createUserSignInDto.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.retreiveUser(email);
    //user does not exist - exit.
    if(!user) {
      return;
    }
    //validate input user credentials are valid.
    const isMatching: boolean = await bcrypt.compare(password, user.password);
    //input user credentials are invalid.
    if(!isMatching) {
      return;
    }
    return user;
  }
}
