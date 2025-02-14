import { Controller, Get, Req, Patch, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get('test-auth-user-request')
  testAuthUserRequest(@Req() request) {
    return this.usersService.retrieveUserViaId(request.user.userId);
  }

  @Patch('delete-user-request')
  async deleteUserRequest(@Req() request) {
    await this.usersService.deleteUserRequest(request.user.userId);
  }

  @Delete('delete-user-confirm/:inputVerificationCode')
  async deleteUserConfirm(@Req() request, @Param() params: any) {
    await this.usersService.deleteUserConfirm(request.user.userId, params.inputVerificationCode);
  }
}