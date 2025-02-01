import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator.factory';
import { User } from '../users/entities/user.entity';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { CreateUserSignUpDto } from '../users/dto/create-user-sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserSignUpDto: CreateUserSignUpDto, @Res({ passthrough: true }) response) {
    const userDetails: { user: User, access_token_obj: { access_token: string} } = await this.authService.signup(createUserSignUpDto);
    response.cookie('jwt', userDetails.access_token_obj.access_token);
    return userDetails;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() request, @Res({ passthrough: true }) response) {
    const userDetails: { access_token: string} = await this.authService.signin(request.user.id, request.user.email);
    response.cookie('jwt', userDetails.access_token);
    return userDetails;
  }
}