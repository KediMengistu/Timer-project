import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator.factory';
import { LocalAuthGuard } from './passport/local-auth.guard';
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
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() request) {
    //retreive and store user object in request once validated via LocalStrategy.
    //create CreateUserSignInDto via this request user object.
    let signInCred: CreateUserSignInDto = new CreateUserSignInDto();
    signInCred.email = request.user.email;
    signInCred.password = request.user.password;
    return this.authService.signin(request.user.id, signInCred);
  }
}
