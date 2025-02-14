import { Module } from '@nestjs/common';
import { TaskSchedulerService } from './taskscheduler.service';

@Module({
  providers: [TaskSchedulerService]
})
export class TaskSchedulerModule {}
