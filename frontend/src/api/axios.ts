import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";

interface CustomImportMetaEnv extends ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_API_BASE_URL?: string;
}

interface CustomImportMeta extends ImportMeta {
  readonly env: CustomImportMetaEnv;
}

const { VITE_API_URL, VITE_API_BASE_URL } = (import.meta as CustomImportMeta).env;

const baseURL = VITE_API_URL ?? VITE_API_BASE_URL ?? "http://localhost:3000";

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("auth_token");
  if (!token) return config;

  const maybe = config.headers as AxiosHeaders | undefined;
  if (maybe && typeof maybe.set === "function") {
    maybe.set("Authorization", `Bearer ${token}`);
  } else {
    const headers = new AxiosHeaders(config.headers || {});
    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }

  return config;
});

export default api;
