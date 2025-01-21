import { Module } from '@nestjs/common';
import { TimersController } from './timers.controller';
import { TimersService } from './timers.service';

@Module({
  controllers: [TimersController],
  providers: [TimersService]
})
export class TimersModule {}
