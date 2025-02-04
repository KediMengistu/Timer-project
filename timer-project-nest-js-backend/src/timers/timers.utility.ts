import { Injectable } from "@nestjs/common";
import { Timer } from "./entities/timer.entity";
import { BreaksService } from "../breaks/breaks.service";
import { Break } from "../breaks/entity/break.entity";

@Injectable()
export class TimersUtility {
  constructor(
    private breaksService: BreaksService
  ) {}

  async completeCreateTimer(timer: Timer): Promise<{ end: Date, numberOfBreaks: number }> {
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
        let breakObjectI: Break = this.completeCreateTimerBreakIHelper(startTimeForBreakI, endTimeForBreakI, i, timer);
        await this.breaksService.createBreak(breakObjectI);
      }
    }
    //calculating start and end times of breaks - for even number of breaks.
    else {
      const timeSegmentMS: number = durationTimeMS / numberOfBreaks;
      for(let i: number = 1; i <= numberOfBreaks; i++) {
        let endTimeForBreakI: Date = new Date(startTimeMS + (i * timeSegmentMS));
        let startTimeForBreakI: Date = new Date(endTimeForBreakI.getTime() - breakDurationMS);
        let breakObjectI: Break = this.completeCreateTimerBreakIHelper(startTimeForBreakI, endTimeForBreakI, i, timer);
        await this.breaksService.createBreak(breakObjectI);
      }
    }
    return { end, numberOfBreaks };
  }

  completeCreateTimerBreakIHelper(startTimeForBreakI: Date, endTimeForBreakI: Date, i: number, timer: Timer): Break {
    let breakObjectI = new Break();
    breakObjectI.breakNumber = i;
    breakObjectI.timer = timer;
    breakObjectI.breakDuration = timer.breakDuration;
    breakObjectI.startTime = startTimeForBreakI;
    breakObjectI.endTime = endTimeForBreakI;
    return breakObjectI;
  }
}