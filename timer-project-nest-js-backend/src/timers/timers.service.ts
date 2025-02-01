import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timer } from './entities/timer.entity';
import { UsersService } from '../users/users.service';
import { CreateTimerDTO } from './dto/create-timer.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TimersService {
  constructor(
    @InjectRepository(Timer)
    private timersRepository: Repository<Timer>,
    private usersService: UsersService
  ) {}

  async createTimer(email: string, createTimerDTO: CreateTimerDTO): Promise<Timer> {
    const user: User = await this.usersService.retreiveUser(email);
    const timer: Timer = this.timersRepository.create({ ...createTimerDTO, user: user });
    const savedTimer: Timer = await this.timersRepository.save(timer);
    //properties that need to be calculated after saving to the timers table in POSTGRESQL database: endTime and numberOfBreaks.
    //completed by calling other TimersService funcitons.
    return savedTimer;
  }
}
