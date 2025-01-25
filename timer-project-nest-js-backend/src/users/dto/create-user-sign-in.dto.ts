import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserSignInDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}