export enum TwoFAMethod {
  NONE = 'none',
  AUTHENTICATOR = 'authenticator',
  PHONE_OTP = 'phone_otp',
} 

export enum OtpType {
  TWO_FACTOR = 'two_factor',
  PASSWORD_RESET = 'password_reset',
}

export enum OtpDeliveryMethod {
  EMAIL = 'email',
  PHONE = 'phone',
}