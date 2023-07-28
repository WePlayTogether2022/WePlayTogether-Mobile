export interface LogInDto {
  emailOrUsername: string;
  password: string;
  code?: string | null;
}

export interface SignUpDto {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

export interface ChangePasswordDto {
  oldPassword?: string | null;
  newPassword: string;
  confirmNewPassword: string;
}

export interface SendOtpDto {
  phoneNumber: string;
  countryIso: string;
}

export interface VerifyOtpDto {
  phoneNumber: string;
  countryIso: string;
  otp: string;
}
