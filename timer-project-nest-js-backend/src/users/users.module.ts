import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { VerificationModule } from '../verification/verification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => VerificationModule)
  ],
  controllers: [UsersController],
  providers: [UsersService], 
  exports: [UsersService]
})
export class UsersModule {}