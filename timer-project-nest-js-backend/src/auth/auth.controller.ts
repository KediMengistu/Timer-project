import { Controller, Post, Body, Patch, UseGuards, Req, Res, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator.factory';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { CreateUserSignUpDto } from '../users/dto/create-user-sign-up.dto';
import { VerifyUserSignUpDTO } from '../users/dto/verify-user-sign-up.dto';
import { VerifyUserForgotPasswordDTO } from '../users/dto/verify-user-forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserSignUpDto: CreateUserSignUpDto) {
    const userDetails: { id: string } = await this.authService.signup(createUserSignUpDto);
    return userDetails;
  }

  @Public()
  @Patch('verify-signup')
  async verifySignup(@Body() verifyUserSignUpDTO: VerifyUserSignUpDTO, @Res({ passthrough: true }) response) {
    const userDetails: { access_token: string } = await this.authService.verifySignup(verifyUserSignUpDTO);
    response.cookie('jwt', userDetails.access_token, 
      {
        httpOnly: true,
        path: '/',
        secure: false,
        sameSite: 'None',
        maxAge: 60000
      }
    );
    return userDetails;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() request, @Res({ passthrough: true }) response) {
    const userDetails: { access_token: string } = await this.authService.signin(request.user.id);
    response.cookie('jwt', userDetails.access_token, 
      {
        httpOnly: true,
        path: '/',
        secure: false,
        sameSite: 'None',
        maxAge: 60000
      }
    );
    return userDetails;
  }

  @Public()
  @Patch('forgot-password/:email')
  async forgotPasswordRequest(@Param() params: any) {
    this.authService.forgotPasswordRequest(params.email);
  }

  @Public()
  @Patch('forgot-password-confirm')
  async forgotPasswordConfirm(@Body() verifyUserForgotPasswordDTO: VerifyUserForgotPasswordDTO) {
    this.authService.forgotPasswordConfirm(verifyUserForgotPasswordDTO);
  }

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