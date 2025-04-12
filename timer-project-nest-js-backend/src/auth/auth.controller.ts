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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserSignUpDto: CreateUserSignUpDto) {
    await this.authService.signup(createUserSignUpDto);
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
      secure: true,
      sameSite: 'None',
      maxAge: 3600000,
      path: '/',
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
      secure: true,
      sameSite: 'None',
      maxAge: 3600000,
      path: '/',
    });
  }

  @Public()
  @Post('signout')
  signout(@Res({ passthrough: true }) response) {
    response.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/',
    });
  }
}
