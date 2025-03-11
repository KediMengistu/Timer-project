import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator.factory';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { CreateUserSignUpDto } from '../users/dto/create-user-sign-up.dto';
import { VerifyUserSignUpDTO } from '../users/dto/verify-user-sign-up.dto';
import { UserForgotPasswordDTO } from 'src/users/dto/user-forgot-password.dto';
import { VerifyUserForgotPasswordDTO } from '../users/dto/verify-user-forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserSignUpDto: CreateUserSignUpDto) {
    return this.authService.signup(createUserSignUpDto);
  }

  @Public()
  @Patch('verify-signup')
  async verifySignup(
    @Body() verifyUserSignUpDTO: VerifyUserSignUpDTO,
    @Res({ passthrough: true }) response,
  ) {
    const userDetails: { access_token: string } =
      await this.authService.verifySignup(verifyUserSignUpDTO);
    response.cookie('jwt', userDetails.access_token, {
      httpOnly: true,
      path: '/',
      secure: false,
      sameSite: 'None',
      maxAge: 60000,
    });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() request, @Res({ passthrough: true }) response) {
    const userDetails: { access_token: string } = await this.authService.signin(
      request.user.id,
    );
    response.cookie('jwt', userDetails.access_token, {
      httpOnly: true,
      path: '/',
      secure: false,
      sameSite: 'None',
      maxAge: 60000,
    });
  }

  @Public()
  @Patch('forgot-password-request')
  async forgotPasswordRequest(
    @Body() userForgotPasswordDTO: UserForgotPasswordDTO,
  ) {
    await this.authService.forgotPasswordRequest(userForgotPasswordDTO);
  }

  @Public()
  @Patch('forgot-password-confirm')
  async forgotPasswordConfirm(
    @Body() verifyUserForgotPasswordDTO: VerifyUserForgotPasswordDTO,
  ) {
    await this.authService.forgotPasswordConfirm(verifyUserForgotPasswordDTO);
  }

  @Public()
  @Post('signout')
  async signout(@Res({ passthrough: true }) response) {
    response.clearCookie('jwt', {
      httpOnly: true,
      path: '/',
      secure: false,
      sameSite: 'None',
    });
  }
}
