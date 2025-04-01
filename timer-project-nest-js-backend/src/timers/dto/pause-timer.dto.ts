import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class PauseTimerDTO {
  @IsDate()
  @Type(() => Date)
  pauseTime: Date;
}
