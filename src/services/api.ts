import { STORAGE_TOKEN_KEY } from "@/constants/auth-keys";
import axios, { type InternalAxiosRequestConfig } from "axios";

type LogoutFn = () => void;
let logoutCallback: LogoutFn | null = null;

export const api = axios.create({
  timeout: 5000,
});

export function getAuthToken() {
  return localStorage.getItem(STORAGE_TOKEN_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(STORAGE_TOKEN_KEY, token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearAuthToken() {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
  delete api.defaults.headers.common.Authorization;
}

export function registerLogoutCallback(fn: LogoutFn) {
  logoutCallback = fn;
}

const initialToken = getAuthToken();
if (initialToken) {
  api.defaults.headers.common.Authorization = `Bearer ${initialToken}`;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.params) {
    config.params = Object.fromEntries(
      Object.entries(config.params as Record<string, unknown>).filter(
        ([, v]) =>
          v !== null &&
          v !== undefined &&
          v !== "" &&
          !(typeof v === "object" && v !== null && Object.keys(v).length === 0),
      ),
    );
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        clearAuthToken();
        logoutCallback?.();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
