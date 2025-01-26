import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator.factory';
import { CreateUserSignUpDto } from '../users/dto/create-user-sign-up.dto';
import { CreateUserSignInDto } from '../users/dto/create-user-sign-in.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() createUserSignUpDto: CreateUserSignUpDto) {
    return this.authService.signup(createUserSignUpDto);
  }

  @Public()
  @Post('signin')
  signin(@Body() createUserSignInDto: CreateUserSignInDto) {
    return this.authService.signin(createUserSignInDto);
  }
}
