import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { store, type RootState } from "../store/store";

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
    if ((store?.getState()as RootState)?.auth?.token) {
     const token = `Bearer ${(store.getState() as RootState).auth?.token}`;
      config.headers = {
        Authorization: token,
        "X-Requested-From": "web",
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
    return Promise.reject(error);
  }
);

export default Api;
