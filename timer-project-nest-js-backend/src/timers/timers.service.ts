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
import { BreaksService } from 'src/breaks/breaks.service';

@Injectable()
export class TimersService {
  constructor(
    @InjectRepository(Timer)
    private timersRepository: Repository<Timer>,
    private usersService: UsersService,
    private timerUtility: TimersUtility,
    private breaksService: BreaksService,
  ) {}

  async createTimer(
    userId: string,
    createTimerDTO: CreateTimerDTO,
  ): Promise<Timer> {
    const user: User = await this.usersService.retrieveUserViaId(userId);
    if (user.numberOfTimers === 3) {
      throw new BadRequestException('Cannot create more than 3 timers.');
    }
    const timer: Timer = this.timersRepository.create({
      ...createTimerDTO,
      user: user,
    });
    const savedTimer: Timer = await this.timersRepository.save(timer);
    const completedTimerStats: { end: Date; numberOfBreaks: number } =
      await this.timerUtility.completeCreateTimer(savedTimer);
    await this.timersRepository.update(
      { id: savedTimer.id },
      {
        endTime: completedTimerStats.end,
        numberOfBreaks: completedTimerStats.numberOfBreaks,
      },
    );
    const completeTimer: Timer = await this.retrieveTimer(savedTimer.id);
    this.usersService.updateUserTimerCount(userId, true, user.numberOfTimers);
    return completeTimer;
  }

  createGuestTimer(createTimerDTO: CreateTimerDTO): GuestTimer {
    return this.timerUtility.guestCompleteCreateTimer(createTimerDTO);
  }

  async retrieveTimer(timerId: string): Promise<Timer> {
    const timer: Timer = await this.timersRepository.findOneBy({ id: timerId });
    if (!timer) {
      throw new NotFoundException('Timer not found.');
    }
    return timer;
  }

  async retrieveAllTimers(userId: string): Promise<Timer[]> {
    const listOfTimers: Timer[] = await this.timersRepository.find({
      where: { user: { id: userId } },
    });
    return listOfTimers;
  }

  async pauseTimer(timerId: string): Promise<Timer> {
    const timer: Timer = await this.retrieveTimer(timerId);
    if (timer.pauseTime) {
      throw new BadRequestException('Timer is currently paused.');
    }
    const now: Date = new Date();
    await this.timersRepository.update({ id: timerId }, { pauseTime: now });
    const updatedTimer: Timer = await this.retrieveTimer(timerId);
    return updatedTimer;
  }

  guestPauseTimer(guestTimerDTO: GuestTimerDTO): GuestTimer {
    if (guestTimerDTO.pauseTime) {
      throw new BadRequestException('Timer is currently paused.');
    }
    const now: Date = new Date();
    let guestTimer: GuestTimer = GuestTimer.fromGuestTimerDTO(guestTimerDTO);
    guestTimer.setPauseTime(now);
    return guestTimer;
  }

  async playTimer(timerId: string): Promise<Timer> {
    let timer: Timer = await this.retrieveTimer(timerId);
    if (timer.unpausedTime) {
      throw new BadRequestException('Timer is currently played.');
    }
    const now: Date = new Date();
    await this.timersRepository.update({ id: timerId }, { unpausedTime: now });
    timer = await this.retrieveTimer(timerId);
    const pausePlayTimerStats: {
      delayedEndTime: Date;
      pausedDurationInMs: number;
    } = this.timerUtility.pausePlayTimerSettingsConfiguration(timer);
    await this.timersRepository.update(
      { id: timerId },
      {
        pauseTime: null,
        unpausedTime: null,
        delayedEndTime: pausePlayTimerStats.delayedEndTime,
        pausedDurationInMs: pausePlayTimerStats.pausedDurationInMs,
      },
    );
    const updatedTimer: Timer = await this.retrieveTimer(timerId);
    return updatedTimer;
  }

  guestPlayTimer(guestTimerDTO: GuestTimerDTO): GuestTimer {
    if (guestTimerDTO.unpausedTime) {
      throw new BadRequestException('Timer is currently played.');
    }
    const now: Date = new Date();
    let guestTimer: GuestTimer = GuestTimer.fromGuestTimerDTO(guestTimerDTO);
    guestTimer.setUnpausedTime(now);
    const guestPausePlayTimerStats: {
      delayedEndTime: Date;
      pausedDurationInMs: number;
    } = this.timerUtility.guestPausePlayTimerSettingsConfiguration(guestTimer);
    guestTimer.setPauseTime(null);
    guestTimer.setUnpausedTime(null);
    guestTimer.setDelayedEndTime(guestPausePlayTimerStats.delayedEndTime);
    guestTimer.setPausedDurationInMs(
      guestPausePlayTimerStats.pausedDurationInMs,
    );
    return guestTimer;
  }

  async restartTimer(timerId: string): Promise<Timer> {
    let timer: Timer = await this.retrieveTimer(timerId);
    const now: Date = new Date();
    if (timer.pauseTime !== null) {
      throw new BadRequestException('Cannot restart paused timer.');
    }
    if (
      (timer.delayedEndTime !== null && timer.delayedEndTime > now) ||
      (timer.endTime !== null && timer.endTime > now)
    ) {
      throw new BadRequestException('Cannot restart unexpired timer.');
    }
    await this.timersRepository.update(
      { id: timerId },
      {
        startTime: now,
        pauseTime: null,
        unpausedTime: null,
        numberOfBreaks: 0,
        pausedDurationInMs: 0,
        endTime: null,
        delayedEndTime: null,
      },
    );
    timer = await this.retrieveTimer(timerId);
    await this.breaksService.removeAllBreaks(timer);
    timer = await this.retrieveTimer(timerId);
    const completedTimerStats: { end: Date; numberOfBreaks: number } =
      await this.timerUtility.completeCreateTimer(timer);
    await this.timersRepository.update(
      { id: timer.id },
      {
        endTime: completedTimerStats.end,
        numberOfBreaks: completedTimerStats.numberOfBreaks,
      },
    );
    const completeTimer: Timer = await this.retrieveTimer(timer.id);
    return completeTimer;
  }

  restartGuestTimer(guestTimerDTO: GuestTimerDTO): GuestTimer {
    const now: Date = new Date();
    if (guestTimerDTO.pauseTime !== null) {
      throw new BadRequestException('Cannot restart paused timer.');
    }
    if (
      (guestTimerDTO.delayedEndTime !== null &&
        guestTimerDTO.delayedEndTime > now) ||
      (guestTimerDTO.endTime !== null && guestTimerDTO.endTime > now)
    ) {
      throw new BadRequestException('Cannot restart unexpired timer.');
    }
    const createTimerDTO: CreateTimerDTO = {
      title: guestTimerDTO.title,
      durationHours: guestTimerDTO.durationHours,
      durationMinutes: guestTimerDTO.durationMinutes,
      durationSeconds: guestTimerDTO.durationSeconds,
      breakDuration: guestTimerDTO.breakDuration,
    };
    const newTimer: GuestTimer = this.createGuestTimer(createTimerDTO);
    return newTimer;
  }

  async removeTimer(userId: string, timerId: string) {
    const user: User = await this.usersService.retrieveUserViaId(userId);
    if (user.numberOfTimers === 0) {
      throw new BadRequestException('No timers to delete.');
    }
    await this.timersRepository.delete({ id: timerId });
    this.usersService.updateUserTimerCount(userId, false, user.numberOfTimers);
  }
}
