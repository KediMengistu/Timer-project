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
