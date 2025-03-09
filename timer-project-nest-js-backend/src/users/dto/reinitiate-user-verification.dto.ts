import { IsString, IsNotEmpty } from 'class-validator';

export class ReinitiateUserVerificationDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  verificationAction: string;
}
