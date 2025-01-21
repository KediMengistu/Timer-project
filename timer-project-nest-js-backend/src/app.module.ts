import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TimersModule } from './timers/timers.module';

@Module({
  imports: [UsersModule, TimersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
