import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get('test-auth-user-request')
  testAuthUserRequest(@Request() req) {
    return this.usersService.retreiveUser(req.user);
  }
}