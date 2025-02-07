import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum, IsDate, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BreakDurationSpans } from '../../breaks/enums/break-duration.enum';
import { GuestTimerBreak } from '../../breaks/objects/guest-timer-break';
import { GuestTimerBreakDTO } from '../../breaks/dto/guest-timer-break.dto';

export class GuestTimerDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  delayedEndTime?: Date;

  @IsInt()
  @IsNotEmpty()
  durationHours: number;

  @IsInt()
  @IsNotEmpty()
  durationMinutes: number;

  @IsInt()
  @IsNotEmpty()
  durationSeconds: number;

  @IsOptional()
  @IsInt()
  pausedDurationInMs?: number;

  @IsEnum(BreakDurationSpans)
  @IsNotEmpty()
  breakDuration: BreakDurationSpans;

  @IsInt()
  numberOfBreaks: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GuestTimerBreakDTO)
  breaks: GuestTimerBreak[];

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  pauseTime?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  unpausedTime?: Date;
}