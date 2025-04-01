import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class PlayTimerDTO {
  @IsDate()
  @Type(() => Date)
  playTime: Date;
}
