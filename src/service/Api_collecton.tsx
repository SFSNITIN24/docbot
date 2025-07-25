import { postApi } from "./Api_methods";

const USER_REGISTER = "/auth/register";
const TWO_FACTOR_AUTHENTICATION = "/auth";

export const userRegister = (payload: object) => {
  const res = postApi(USER_REGISTER, payload);
  return res;
};

export const twoFactorAuthentication = (id: string, payload: object) => {
  const res = postApi(`${TWO_FACTOR_AUTHENTICATION}/${id}/2fa`, payload);
  return res;
}
