import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TaskSchedulerService {
  constructor(private dataSource: DataSource) {}
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async autoDeleteUser() {
    const now: Date = new Date();
    await this.dataSource.
    createQueryBuilder().
    delete().
    from(User).
    where('userAccountExpirationTime IS NOT NULL AND userAccountExpirationTime <= :currentTime', { currentTime: now }).
    execute();
  }
}
