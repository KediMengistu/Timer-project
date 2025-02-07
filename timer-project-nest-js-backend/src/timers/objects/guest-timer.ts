import { BreakDurationSpans } from "../../breaks/enums/break-duration.enum";
import { GuestTimerBreak } from "../../breaks/objects/guest-timer-break";
import { CreateTimerDTO } from "../dto/create-timer.dto";
import { GuestTimerDTO } from "../dto/guest-timer.dto";

export class GuestTimer {
  private title!: string;
  private startTime!: Date;
  private endTime!: Date;
  private delayedEndTime?: Date;
  private durationHours!: number;
  private durationMinutes!: number;
  private durationSeconds!: number;
  private pausedDurationInMs?: number;
  private breakDuration!: BreakDurationSpans;
  private numberOfBreaks!: number;
  private breaks!: GuestTimerBreak[];
  private pauseTime?: Date;
  private unpausedTime?: Date;

  private constructor() {}

  public static fromCreateTimerDTO(createTimerDto: CreateTimerDTO): GuestTimer {
    const guestTimer = new GuestTimer();
    guestTimer.setTitle(createTimerDto.title);
    guestTimer.setDurationHours(createTimerDto.durationHours);
    guestTimer.setDurationMinutes(createTimerDto.durationMinutes);
    guestTimer.setDurationSeconds(createTimerDto.durationSeconds);
    guestTimer.setBreakDuration(createTimerDto.breakDuration);
    guestTimer.setBreaks([]);
    return guestTimer;
  }

  public static fromGuestTimerDTO(guestTimerDTO: GuestTimerDTO): GuestTimer {
    const guestTimer = new GuestTimer();
    guestTimer.setTitle(guestTimerDTO.title);
    guestTimer.setStartTime(guestTimerDTO.startTime);
    guestTimer.setEndTime(guestTimerDTO.endTime);
    guestTimer.setDelayedEndTime(guestTimerDTO?.delayedEndTime);
    guestTimer.setDurationHours(guestTimerDTO.durationHours);
    guestTimer.setDurationMinutes(guestTimerDTO.durationMinutes);
    guestTimer.setDurationSeconds(guestTimerDTO.durationSeconds);
    guestTimer.setPausedDurationInMs(guestTimerDTO?.pausedDurationInMs);
    guestTimer.setBreakDuration(guestTimerDTO.breakDuration);
    guestTimer.setNumberOfBreaks(guestTimerDTO.numberOfBreaks);
    guestTimer.setBreaks(guestTimerDTO.breaks);
    guestTimer.setPauseTime(guestTimerDTO?.pauseTime);
    guestTimer.setUnpausedTime(guestTimerDTO?.unpausedTime);
    return guestTimer;
  }

  // Title
  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  // Start Time
  public getStartTime(): Date {
    return this.startTime;
  }

  public setStartTime(startTime: Date): void {
    this.startTime = startTime;
  }

  // End Time
  public getEndTime(): Date {
    return this.endTime;
  }

  public setEndTime(endTime: Date): void {
    this.endTime = endTime;
  }

  // Delayed End Time
  public getDelayedEndTime(): Date {
    return this.delayedEndTime;
  }

  public setDelayedEndTime(delayedEndTime: Date): void {
    this.delayedEndTime = delayedEndTime;
  }

  // Duration Hours
  public getDurationHours(): number {
    return this.durationHours;
  }

  public setDurationHours(hours: number): void {
    this.durationHours = hours;
  }

  // Duration Minutes
  public getDurationMinutes(): number {
    return this.durationMinutes;
  }

  public setDurationMinutes(minutes: number): void {
    this.durationMinutes = minutes;
  }

  // Duration Seconds
  public getDurationSeconds(): number {
    return this.durationSeconds;
  }

  public setDurationSeconds(seconds: number): void {
    this.durationSeconds = seconds;
  }

  // Paused Duration (in Ms)
  public getPausedDurationInMs(): number {
    return this.pausedDurationInMs;
  }

  public setPausedDurationInMs(pausedMs: number): void {
    this.pausedDurationInMs = pausedMs;
  }

  // Break Duration
  public getBreakDuration(): BreakDurationSpans {
    return this.breakDuration;
  }

  public setBreakDuration(breakDuration: BreakDurationSpans): void {
    this.breakDuration = breakDuration;
  }

  // Number of Breaks
  public getNumberOfBreaks(): number {
    return this.numberOfBreaks;
  }

  public setNumberOfBreaks(numBreaks: number): void {
    this.numberOfBreaks = numBreaks;
  }

  // Breaks
  public getBreaks(): GuestTimerBreak[] {
    return this.breaks;
  }

  public setBreaks(breaks: GuestTimerBreak[]): void {
    this.breaks = breaks;
  }

  // Pause Time
  public getPauseTime(): Date {
    return this.pauseTime;
  }

  public setPauseTime(pauseTime: Date): void {
    this.pauseTime = pauseTime;
  }

  // Unpaused Time
  public getUnpausedTime(): Date {
    return this.unpausedTime;
  }

  public setUnpausedTime(unpausedTime: Date): void {
    this.unpausedTime = unpausedTime;
  }
}