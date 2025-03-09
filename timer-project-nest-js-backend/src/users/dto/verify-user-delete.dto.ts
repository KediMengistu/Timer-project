import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyUserDeleteDTO {
  @IsString()
  @IsNotEmpty()
  inputVerificationCode: string;

  @IsString()
  @IsNotEmpty()
  verificationAction: string;
}
