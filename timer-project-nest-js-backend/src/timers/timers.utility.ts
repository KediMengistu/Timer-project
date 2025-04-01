import { Injectable } from '@nestjs/common';
import { Timer } from './entities/timer.entity';
import { BreaksService } from '../breaks/breaks.service';
import { Break } from '../breaks/entity/break.entity';
import { CreateTimerDTO } from './dto/create-timer.dto';
import { GuestTimer } from './objects/guest-timer';
import { GuestTimerBreak } from '../breaks/objects/guest-timer-break';
import { BreakDurationSpans } from '../breaks/enums/break-duration.enum';

@Injectable()
export class TimersUtility {
  constructor(private breaksService: BreaksService) {}

  async completeCreateTimer(
    timer: Timer,
  ): Promise<{ end: Date; numberOfBreaks: number }> {
    //calculating the end time for the timer.
    const start: Date = timer.startTime;
    const hours: number = timer.durationHours;
    const minutes: number = timer.durationMinutes;
    const seconds: number = timer.durationSeconds;
    const startTimeMS = start.getTime();
    const durationTimeMS = (hours * 3600 + minutes * 60 + seconds) * 1000;
    const end: Date = new Date(startTimeMS + durationTimeMS);

    //calculating the number of breaks for the timer.
    const breakDurationMS: number = timer.breakDuration * 60 * 1000;
    const numberOfBreaks: number = Math.floor(
      durationTimeMS / (2 * breakDurationMS),
    );

    //calculating start and end times of breaks - for odd number of breaks.
    if (numberOfBreaks % 2 !== 0) {
      const numberOfWorkSegments: number = numberOfBreaks + 1;
      const workDurationMS: number = durationTimeMS / 2 / numberOfWorkSegments;
      for (let i: number = 1; i <= numberOfBreaks; i++) {
        let startTimeForBreakI: Date = new Date(
          startTimeMS + i * workDurationMS + (i - 1) * breakDurationMS,
        );
        let endTimeForBreakI: Date = new Date(
          startTimeForBreakI.getTime() + breakDurationMS,
        );
        let breakObjectI: Break = this.completeCreateTimerBreakIHelper(
          startTimeForBreakI,
          endTimeForBreakI,
          i,
          timer,
        );
        await this.breaksService.createBreak(breakObjectI);
      }
    }

    //calculating start and end times of breaks - for even number of breaks.
    else {
      const timeSegmentMS: number = durationTimeMS / numberOfBreaks;
      for (let i: number = 1; i <= numberOfBreaks; i++) {
        let endTimeForBreakI: Date = new Date(startTimeMS + i * timeSegmentMS);
        let startTimeForBreakI: Date = new Date(
          endTimeForBreakI.getTime() - breakDurationMS,
        );
        let breakObjectI: Break = this.completeCreateTimerBreakIHelper(
          startTimeForBreakI,
          endTimeForBreakI,
          i,
          timer,
        );
        await this.breaksService.createBreak(breakObjectI);
      }
    }
    return { end, numberOfBreaks };
  }

  private completeCreateTimerBreakIHelper(
    startTimeForBreakI: Date,
    endTimeForBreakI: Date,
    i: number,
    timer: Timer,
  ): Break {
    let breakObjectI = new Break();
    breakObjectI.breakNumber = i;
    breakObjectI.timer = timer;
    breakObjectI.breakDuration = timer.breakDuration;
    breakObjectI.startTime = startTimeForBreakI;
    breakObjectI.endTime = endTimeForBreakI;
    return breakObjectI;
  }

  guestCompleteCreateTimer(createTimerDTO: CreateTimerDTO): GuestTimer {
    //calculating the end time for the timer.
    let guestTimer = GuestTimer.fromCreateTimerDTO(createTimerDTO);
    const start: Date = new Date();
    const hours: number = guestTimer.getDurationHours();
    const minutes: number = guestTimer.getDurationMinutes();
    const seconds: number = guestTimer.getDurationSeconds();
    const startTimeMS = start.getTime();
    const durationTimeMS = (hours * 3600 + minutes * 60 + seconds) * 1000;
    const end: Date = new Date(startTimeMS + durationTimeMS);

    //calculating the number of breaks for the timer.
    const breakDurationMS: number = guestTimer.getBreakDuration() * 60 * 1000;
    const numberOfBreaks: number = Math.floor(
      durationTimeMS / (2 * breakDurationMS),
    );

    //calculating start and end times of breaks - for odd number of breaks.
    if (numberOfBreaks % 2 !== 0) {
      const numberOfWorkSegments: number = numberOfBreaks + 1;
      const workDurationMS: number = durationTimeMS / 2 / numberOfWorkSegments;
      for (let i: number = 1; i <= numberOfBreaks; i++) {
        let startTimeForBreakI: Date = new Date(
          startTimeMS + i * workDurationMS + (i - 1) * breakDurationMS,
        );
        let endTimeForBreakI: Date = new Date(
          startTimeForBreakI.getTime() + breakDurationMS,
        );
        let guestTimerBreak: GuestTimerBreak =
          this.guestCompleteCreateTimerBreakIHelper(
            startTimeForBreakI,
            endTimeForBreakI,
            i,
            guestTimer,
          );
        let listOfGuestTimerBreaks: GuestTimerBreak[] = guestTimer.getBreaks();
        listOfGuestTimerBreaks.push(guestTimerBreak);
        guestTimer.setBreaks(listOfGuestTimerBreaks);
      }
    }

    //calculating start and end times of breaks - for even number of breaks.
    else {
      const timeSegmentMS: number = durationTimeMS / numberOfBreaks;
      for (let i: number = 1; i <= numberOfBreaks; i++) {
        let endTimeForBreakI: Date = new Date(startTimeMS + i * timeSegmentMS);
        let startTimeForBreakI: Date = new Date(
          endTimeForBreakI.getTime() - breakDurationMS,
        );
        let guestTimerBreak: GuestTimerBreak =
          this.guestCompleteCreateTimerBreakIHelper(
            startTimeForBreakI,
            endTimeForBreakI,
            i,
            guestTimer,
          );
        let listOfGuestTimerBreaks: GuestTimerBreak[] = guestTimer.getBreaks();
        listOfGuestTimerBreaks.push(guestTimerBreak);
        guestTimer.setBreaks(listOfGuestTimerBreaks);
      }
    }

    //inputing all remaining unplaced entries.
    guestTimer.setStartTime(start);
    guestTimer.setEndTime(end);
    guestTimer.setNumberOfBreaks(numberOfBreaks);
    return guestTimer;
  }

  private guestCompleteCreateTimerBreakIHelper(
    startTimeForBreakI: Date,
    endTimeForBreakI: Date,
    i: number,
    guestTimer: GuestTimer,
  ): GuestTimerBreak {
    const guestTimerBreakObject: {
      breakNumber: number;
      breakDuration: BreakDurationSpans;
      startTime: Date;
      endTime: Date;
    } = {
      breakNumber: i,
      breakDuration: guestTimer.getBreakDuration(),
      startTime: startTimeForBreakI,
      endTime: endTimeForBreakI,
    };
    const guestTimerBreak: GuestTimerBreak = new GuestTimerBreak(
      guestTimerBreakObject,
    );
    return guestTimerBreak;
  }

  pausePlayTimerSettingsConfiguration(timer: Timer): {
    delayedEndTime: Date;
    pausedDurationInMs: number;
  } {
    const totalMs = timer.unpausedTime.getTime() - timer.pauseTime.getTime();
    const newPausedDurationInMs = Number(timer.pausedDurationInMs) + totalMs;
    const delayedEndTime = new Date(
      timer.endTime.getTime() + newPausedDurationInMs,
    );
    return {
      delayedEndTime,
      pausedDurationInMs: newPausedDurationInMs,
    };
  }

  guestPausePlayTimerSettingsConfiguration(guestTimer: GuestTimer): {
    delayedEndTime: Date;
    pausedDurationInMs: number;
  } {
    const totalMs =
      guestTimer.getUnpausedTime().getTime() -
      guestTimer.getPauseTime().getTime();
    let pausedDurationInMs: number = guestTimer.getPausedDurationInMs();
    pausedDurationInMs !== undefined
      ? (pausedDurationInMs += totalMs)
      : (pausedDurationInMs = totalMs);
    const delayedEndTime = new Date(
      guestTimer.getEndTime().getTime() + pausedDurationInMs,
    );
    return {
      delayedEndTime,
      pausedDurationInMs,
    };
  }
}
