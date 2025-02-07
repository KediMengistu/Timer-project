import { BreakDurationSpans } from "../enums/break-duration.enum";

export class GuestTimerBreak {
  private breakNumber: number;
  private breakDuration: BreakDurationSpans;
  private startTime: Date;
  private endTime: Date;

  constructor(
    guestTimerBreakObject: {
      breakNumber: number,
      breakDuration: BreakDurationSpans,
      startTime: Date,
      endTime: Date,
    }
  ) {
    this.breakNumber = guestTimerBreakObject.breakNumber;
    this.breakDuration = guestTimerBreakObject.breakDuration;
    this.startTime = guestTimerBreakObject.startTime;
    this.endTime = guestTimerBreakObject.endTime;
  }

  // breakNumber
  public getBreakNumber(): number {
    return this.breakNumber;
  }

  public setBreakNumber(breakNumber: number): void {
    this.breakNumber = breakNumber;
  }

  // breakDuration
  public getBreakDuration(): BreakDurationSpans {
    return this.breakDuration;
  }

  public setBreakDuration(breakDuration: BreakDurationSpans): void {
    this.breakDuration = breakDuration;
  }

  // startTime
  public getStartTime(): Date {
    return this.startTime;
  }

  public setStartTime(startTime: Date): void {
    this.startTime = startTime;
  }

  // endTime
  public getEndTime(): Date {
    return this.endTime;
  }

  public setEndTime(endTime: Date): void {
    this.endTime = endTime;
  }
}
