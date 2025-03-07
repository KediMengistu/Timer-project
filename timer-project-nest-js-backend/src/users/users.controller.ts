import {
  Controller,
  Get,
  Req,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { VerifyUserDeleteDTO } from './dto/verify-user-delete.dto';

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
