import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { TimersController } from './timers.controller';
import { TimersService } from './timers.service';
import { Timer } from './entities/timer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timer]), UsersModule],
  controllers: [TimersController],
  providers: [TimersService]
})
export class TimersModule {}
