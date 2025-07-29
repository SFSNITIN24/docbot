import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { store, type RootState } from "../store/store";
import { logout, clearRememberMeToken } from "../store/slices/authSlice";

const BaseUrl = import.meta.env.VITE_BACKEND_API_URL;

const Api = axios.create({
  timeout: 1000000,
  baseURL: BaseUrl,
});

Api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
Api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

Api.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    const state = store?.getState() as RootState;
    const auth = state.auth;
    if (auth.token) {
      const token = `Bearer ${auth.token}`;
      config.headers = {
        Authorization: token,
        "X-Requested-From": "web",
      };
    }
    else if (auth.rememberMeToken) {
      const token = `Bearer ${auth.rememberMeToken}`;
      config.headers = {
        Authorization: token,
        "X-Requested-From": "web",
        "X-Remember-Me": "true",
      };
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      store.dispatch(clearRememberMeToken());
      // window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default Api;
