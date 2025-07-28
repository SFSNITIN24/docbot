import { postApi } from "./Api_methods";

const USER_REGISTER = "/auth/register";
const TWO_FACTOR_AUTHENTICATION = "/auth";
const LOGIN = "/auth/login";
const VERIFY_2FA = "/auth/2fa/verify";
const FORGOT_PASSWORD = "/auth/forgot-password";
const VERIFY_PASSWORD_RESET_OTP = "/auth/verify-password-reset-otp"
const RESET_PASSWORD = "/auth/reset-password";

export const userRegister = (payload: object) => {
  const res = postApi(USER_REGISTER, payload);
  return res;
};

export const twoFactorAuthentication = (id: string, queryString: string) => {
  return postApi(`${TWO_FACTOR_AUTHENTICATION}/${id}/2fa?${queryString}`, {});
};

export const userLogin = (payload: object) => {
  const res = postApi(LOGIN, payload);
  return res;
};

export const verifyTwoFactorAuthentication = (payload: object) => {
  const res = postApi(VERIFY_2FA, payload);
  return res;
};

export const forgotPassword = (payload: object) => {
  const res = postApi(FORGOT_PASSWORD, payload);
  return res;
};
export const verifyPasswordResetOtp = (payload: object) => {
  const res = postApi(VERIFY_PASSWORD_RESET_OTP, payload);
  return res;
};

export const resetPassword = (payload: object) => {
  const res = postApi(RESET_PASSWORD, payload);
  return res;
};