import { Controller, Get, Req, Patch, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/auth.decorator.factory';
import { User } from './entities/user.entity';
import { VerifyUserDeleteDTO } from './dto/verify-user-delete.dto';
import { UserForgotPasswordDTO } from 'src/users/dto/user-forgot-password.dto';
import { VerifyUserForgotPasswordDTO } from '../users/dto/verify-user-forgot-password.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('retrieve-user')
  async retrieveUser(@Req() request) {
    const user: User = await this.usersService.retrieveUserViaId(
      request.user.userId,
    );
    const {
      id,
      password,
      verificationCode,
      verificationCodeExpireTime,
      verificationAction,
      ...result
    } = user;
    return result;
  }

  @Public()
  @Patch('forgot-password-request')
  async forgotPasswordRequest(
    @Body() userForgotPasswordDTO: UserForgotPasswordDTO,
  ) {
    await this.usersService.forgotPasswordRequest(userForgotPasswordDTO);
  }

  @Public()
  @Patch('forgot-password-confirm')
  async forgotPasswordConfirm(
    @Body() verifyUserForgotPasswordDTO: VerifyUserForgotPasswordDTO,
  ) {
    await this.usersService.forgotPasswordConfirm(verifyUserForgotPasswordDTO);
  }

  @Patch('delete-user-request')
  async deleteUserRequest(@Req() request) {
    await this.usersService.deleteUserRequest(request.user.userId);
  }

  @Delete('delete-user-confirm')
  async deleteUserConfirm(
    @Req() request,
    @Body() verifyUserDeleteDTO: VerifyUserDeleteDTO,
  ) {
    await this.usersService.deleteUserConfirm(
      request.user.userId,
      verifyUserDeleteDTO,
    );
  }
}
