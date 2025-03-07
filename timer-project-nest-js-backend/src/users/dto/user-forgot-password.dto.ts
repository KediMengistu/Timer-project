import { IsString, IsNotEmpty } from 'class-validator';

export class UserForgotPasswordDTO {
  @IsString()
  @IsNotEmpty()
  email: string;
}
