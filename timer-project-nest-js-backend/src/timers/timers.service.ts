import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timer } from './entities/timer.entity';
import { UsersService } from '../users/users.service';
import { BreaksService } from 'src/breaks/breaks.service';
import { CreateTimerDTO } from './dto/create-timer.dto';
import { User } from '../users/entities/user.entity';
import { Break } from '../breaks/entity/break.entity';

@Injectable()
export class TimersService {
  constructor(
    @InjectRepository(Timer)
    private timersRepository: Repository<Timer>,
    private usersService: UsersService,
    private breaksService: BreaksService
  ) {}

  async createTimer(email: string, createTimerDTO: CreateTimerDTO): Promise<Timer> {
    const user: User = await this.usersService.retreiveUser(email);
    const timer: Timer = this.timersRepository.create({ ...createTimerDTO, user: user });
    const savedTimer: Timer = await this.timersRepository.save(timer);
    //properties that need to be calculated after saving to the timers table in POSTGRESQL database: endTime and numberOfBreaks.
    //completed by calling other TimersService funcitons.
    await this.completeCreateTimer(savedTimer);
    const completeTimer: Timer = await this.retreiveTimer(savedTimer.id);
    return completeTimer;
  }

  async completeCreateTimer(timer: Timer) {
    //calculating the end time for the timer.
    const start: Date = timer.startTime;
    const hours: number = timer.durationHours;
    const minutes: number = timer.durationMinutes;
    const seconds: number = timer.durationSeconds;
    const startTimeMS = start.getTime();
    const durationTimeMS = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
    const end: Date = new Date(startTimeMS + durationTimeMS);

    //calculating the number of breaks for the timer.
    const breakDurationMS: number = (timer.breakDuration * 60) * 1000;
    const numberOfBreaks: number = Math.floor((durationTimeMS ) / (2 * breakDurationMS));

    //calculating start and end times of breaks - for odd number of breaks.
    if(numberOfBreaks % 2 !== 0){
      const numberOfWorkSegments: number = numberOfBreaks + 1;
      const workDurationMS: number = (durationTimeMS / 2) / (numberOfWorkSegments);
      for(let i: number = 1; i <= numberOfBreaks; i++) {
        let startTimeForBreakI: Date = new Date(startTimeMS + (i * workDurationMS) + ((i - 1) * breakDurationMS));
        let endTimeForBreakI: Date = new Date(startTimeForBreakI.getTime() + breakDurationMS);
        let breakObjectI = new Break();
        breakObjectI.breakNumber = i;
        breakObjectI.timer = timer;
        breakObjectI.breakDuration = timer.breakDuration;
        breakObjectI.startTime = startTimeForBreakI;
        breakObjectI.endTime = endTimeForBreakI;
        await this.breaksService.createBreak(breakObjectI);
      }
    }
    //calculating start and end times of breaks - for even number of breaks.
    else {
      const timeSegmentMS: number = durationTimeMS / numberOfBreaks;
      for(let i: number = 1; i <= numberOfBreaks; i++) {
        let endTimeForBreakI: Date = new Date(startTimeMS + (i * timeSegmentMS));
        let startTimeForBreakI: Date = new Date(endTimeForBreakI.getTime() - breakDurationMS);
        let breakObjectI = new Break();
        breakObjectI.breakNumber = i;
        breakObjectI.timer = timer;
        breakObjectI.breakDuration = timer.breakDuration;
        breakObjectI.startTime = startTimeForBreakI;
        breakObjectI.endTime = endTimeForBreakI;
        await this.breaksService.createBreak(breakObjectI);
      }
    }
    await this.timersRepository.update({ id: timer.id }, { endTime: end, numberOfBreaks });
  }

  retreiveTimer(id: string): Promise<Timer> {
    return this.timersRepository.findOneBy({ id });
  }
}
