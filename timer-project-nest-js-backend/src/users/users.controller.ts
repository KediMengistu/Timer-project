import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/auth.decorator.factory';
import { LocalAuthGuard } from 'src/auth/passport/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('test-auth-user-request')
  testAuthUserRequest(@Req() request) {
    return this.usersService.retreiveUser(request.user.email);
  }
}