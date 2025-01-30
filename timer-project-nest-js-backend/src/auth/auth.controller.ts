import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator.factory';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { CreateUserSignUpDto } from '../users/dto/create-user-sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() createUserSignUpDto: CreateUserSignUpDto) {
    return this.authService.signup(createUserSignUpDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() request) {
    return this.authService.signin(request.user.id, request.user.email);
  }
}