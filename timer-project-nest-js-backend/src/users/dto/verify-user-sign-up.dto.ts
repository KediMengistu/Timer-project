import { IsString, IsNotEmpty } from "class-validator";

export class VerifyUserSignUpDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  inputVerificationCode: string;
}