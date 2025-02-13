import { IsString, IsNotEmpty, IsStrongPassword } from "class-validator";

export class VerifyUserForgotPasswordDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  inputVerificationCode: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  newPassword: string;
}