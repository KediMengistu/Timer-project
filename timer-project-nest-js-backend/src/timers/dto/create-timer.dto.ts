import { IsString, IsNotEmpty, IsInt, IsEnum } from "class-validator";
import { BreakDurationSpans } from "../../breaks/enums/break-duration.enum";

export class CreateTimerDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  durationHours: number;

  @IsInt()
  @IsNotEmpty()
  durationMinutes: number;

  @IsInt()
  @IsNotEmpty()
  durationSeconds: number;

  @IsEnum(BreakDurationSpans)
  @IsNotEmpty()
  breakDuration: number;
}