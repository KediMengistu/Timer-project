import { Controller, Get, Req, Patch, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { VerifyUserDeleteDTO } from './dto/verify-user-delete.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('test-auth-user-request')
  testAuthUserRequest(@Req() request) {
    return this.usersService.retrieveUserViaId(request.user.userId);
  }

  @Get('retrieve-user-email')
  async retrieveUserEmail(@Req() request) {
    const user: User = await this.usersService.retrieveUserViaId(
      request.user.userId,
    );
    return user.email;
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
