import { IsInt, IsNotEmpty, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { BreakDurationSpans } from '../enums/break-duration.enum';

export class GuestTimerBreakDTO {
  @IsInt()
  @IsNotEmpty()
  breakNumber: number;

  @IsEnum(BreakDurationSpans)
  @IsNotEmpty()
  breakDuration: BreakDurationSpans;

  @Type(() => Date)
  @IsDate()
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  endTime: Date;
}