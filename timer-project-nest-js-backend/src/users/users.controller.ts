import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserSignUpDto } from './dto/create-user-sign-up.dto';
import { CreateUserSignInDto } from './dto/create-user-sign-in.dto';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post('signup')
  signup(@Body() createUserSignUpDto: CreateUserSignUpDto) {
    return this.usersService.signup(createUserSignUpDto);
  }

  @Post('signin')
  signin(@Body() createUserSignInDto: CreateUserSignInDto) {
    return this.usersService.signin(createUserSignInDto);
  }
}
