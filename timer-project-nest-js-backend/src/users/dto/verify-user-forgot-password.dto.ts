import { IsString, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class VerifyUserForgotPasswordDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  inputVerificationCode: string;

  @IsString()
  @IsStrongPassword({}, { message: 'Password provided is too weak.' })
  @IsNotEmpty()
  newPassword: string;
}
