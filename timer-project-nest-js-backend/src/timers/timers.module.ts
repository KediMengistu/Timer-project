import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timer } from './entities/timer.entity';
import { UsersModule } from '../users/users.module';
import { BreaksModule } from '../breaks/breaks.module';
import { TimersController } from './timers.controller';
import { TimersService } from './timers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timer]), 
    UsersModule,
    BreaksModule
  ],
  controllers: [TimersController],
  providers: [TimersService]
})
export class TimersModule {}
