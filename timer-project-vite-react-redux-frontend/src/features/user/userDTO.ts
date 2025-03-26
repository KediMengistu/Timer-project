export interface ForgotPasswordDTO {
  email: string;
}

export interface VerifyForgotPasswordDTO {
  email: string;
  inputVerificationCode: string;
  newPassword: string;
}

export interface VerifyDeleteAccountDTO {
  inputVerificationCode: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  numberOfTimers: number;
  isVerified: string;
  previousSigninTime: string;
  userAccountExpirationTime: string;
  createdAt: string;
  updatedAt: string;
}
