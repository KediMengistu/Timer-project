import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timer } from './entities/timer.entity';
import { UsersService } from '../users/users.service';
import { CreateTimerDTO } from './dto/create-timer.dto';
import { User } from '../users/entities/user.entity';
import { TimersUtility } from './timers.utility';

@Injectable()
export class TimersService {
  constructor(
    @InjectRepository(Timer)
    private timersRepository: Repository<Timer>,
    private usersService: UsersService,
    private timerUtility: TimersUtility
  ) {}

  async createTimer(email: string, createTimerDTO: CreateTimerDTO): Promise<Timer> {
    const user: User = await this.usersService.retreiveUser(email);
    const timer: Timer = this.timersRepository.create({ ...createTimerDTO, user: user });
    const savedTimer: Timer = await this.timersRepository.save(timer);
    //properties that need to be calculated after saving to the timers table in POSTGRESQL database: endTime and numberOfBreaks.
    //completed by calling other TimersService funcitons.
    const completedTimerStats: { end: Date, numberOfBreaks: number } = await this.timerUtility.completeCreateTimer(savedTimer);
    await this.timersRepository.update({ id: savedTimer.id }, { endTime: completedTimerStats.end, numberOfBreaks: completedTimerStats.numberOfBreaks });
    const completeTimer: Timer = await this.retreiveTimer(savedTimer.id);
    return completeTimer;
  }

  async retreiveTimer(id: string): Promise<Timer> {
    return this.timersRepository.findOneBy({ id });
  }

  async pauseTimer(id: string): Promise<Timer> {
    const now: Date = new Date();
    await this.timersRepository.update({ id }, { pauseTime: now });
    return await this.retreiveTimer(id);
  }
}
