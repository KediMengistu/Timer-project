export interface SignUpDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SignInDTO {
  email: string;
  password: string;
}

export interface VerifyAccountDTO {
  email: string;
  password: string;
  inputVerificationCode: string;
}
