import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timer } from './entities/timer.entity';
import { UsersService } from '../users/users.service';
import { CreateTimerDTO } from './dto/create-timer.dto';
import { User } from '../users/entities/user.entity';
import { BadRequestException } from '../exception/bad-request.exception';
import { TimersUtility } from './timers.utility';
import { NotFoundException } from '../exception/not-found.exception';
import { GuestTimer } from './objects/guest-timer';
import { GuestTimerDTO } from './dto/guest-timer.dto';

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
    if(user.numberOfTimers === 3) {
      throw new BadRequestException('Cannot create more than 3 timers.');
    }
    const timer: Timer = this.timersRepository.create({ ...createTimerDTO, user: user });
    const savedTimer: Timer = await this.timersRepository.save(timer);
    const completedTimerStats: { end: Date, numberOfBreaks: number } = await this.timerUtility.completeCreateTimer(savedTimer);
    await this.timersRepository.update({ id: savedTimer.id }, { endTime: completedTimerStats.end, numberOfBreaks: completedTimerStats.numberOfBreaks });
    const completeTimer: Timer = await this.retreiveTimer(savedTimer.id);
    this.usersService.updateUserTimerCount(user.email, true, user.numberOfTimers);
    return completeTimer;
  }

  createGuestTimer(createTimerDTO: CreateTimerDTO): GuestTimer {
    return this.timerUtility.guestCompleteCreateTimer(createTimerDTO);
  }

  async retreiveTimer(id: string): Promise<Timer> {
    const timer: Timer = await this.timersRepository.findOneBy({ id });
    if(!timer) {
      throw new NotFoundException('Timer not found.');
    }
    return timer;
  }

  async retreiveAllTimers(userId: string): Promise<Timer[]> {
    const listOfTimers: Timer[] = await this.timersRepository.find({
      where: { user: { id: userId } },
    });
    return listOfTimers;
  }

  async pauseTimer(id: string): Promise<Timer> {
    const now: Date = new Date();
    await this.timersRepository.update({ id }, { pauseTime: now });
    const updatedTimer: Timer = await this.retreiveTimer(id);
    return updatedTimer;
  }

  guestPauseTimer(guestTimerDTO: GuestTimerDTO): GuestTimer {
    const now: Date = new Date();
    let guestTimer: GuestTimer = GuestTimer.fromGuestTimerDTO(guestTimerDTO);
    guestTimer.setPauseTime(now);
    return guestTimer;
  }

  async playTimer(id: string): Promise<Timer> {
    const now: Date = new Date();
    await this.timersRepository.update({ id }, { unpausedTime: now });
    const timer: Timer = await this.retreiveTimer(id);
    const pausePlayTimerStats: { delayedEndTime: Date, pausedDurationInMs: number } = this.timerUtility.pausePlayTimerSettingsConfiguration(timer);
    await this.timersRepository.update({ id }, {
      pauseTime: null,
      unpausedTime: null,
      delayedEndTime: pausePlayTimerStats.delayedEndTime,
      pausedDurationInMs: pausePlayTimerStats.pausedDurationInMs
    });
    const updatedTimer: Timer = await this.retreiveTimer(id);
    return updatedTimer;
  }

  guestPlayTimer(guestTimerDTO: GuestTimerDTO): GuestTimer {
    const now: Date = new Date();
    let guestTimer: GuestTimer = GuestTimer.fromGuestTimerDTO(guestTimerDTO);
    guestTimer.setUnpausedTime(now);
    const guestPausePlayTimerStats: { delayedEndTime: Date, pausedDurationInMs: number } = this.timerUtility.guestPausePlayTimerSettingsConfiguration(guestTimer);
    guestTimer.setPauseTime(null);
    guestTimer.setUnpausedTime(null);
    guestTimer.setDelayedEndTime(guestPausePlayTimerStats.delayedEndTime);
    guestTimer.setPausedDurationInMs(guestPausePlayTimerStats.pausedDurationInMs)
    return guestTimer;
  }

  async removeTimer(email: string, id: string) {
    const user: User = await this.usersService.retreiveUser(email);
    if(user.numberOfTimers === 0) {
      throw new BadRequestException('No timers to delete.');
    }
    const timer: Timer = await this.retreiveTimer(id);
    await this.timersRepository.remove(timer);
    this.usersService.updateUserTimerCount(user.email, false, user.numberOfTimers);
  }
}