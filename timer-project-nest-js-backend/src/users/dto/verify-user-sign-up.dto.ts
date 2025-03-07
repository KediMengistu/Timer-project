import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyUserSignUpDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  inputVerificationCode: string;
}
