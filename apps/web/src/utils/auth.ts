import axios from "axios";
import type { AuthUser, JwtPayload, LanguagePreference } from "@/dtos/auth.dto";

const SUPPORTED_LOCALES: LanguagePreference[] = ["en", "pt"];

export const TOKEN_STORAGE_KEY = "pulso:token";
export const USER_STORAGE_KEY = "pulso:user";

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalized)) as JwtPayload;
  } catch {
    return null;
  }
};

export const isTokenValid = (token: string | null): token is string => {
  if (!token) return false;
  const payload = decodeToken(token);
  if (!payload?.exp) return false;
  return payload.exp * 1000 > Date.now();
};

export const applyAuthHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const applyLocaleHeader = (locale: LanguagePreference) => {
  axios.defaults.headers.common["Accept-Language"] = locale;
};

export const detectBrowserLocale = (): LanguagePreference => {
  const primary = navigator.language?.split("-")[0]?.toLowerCase();
  return SUPPORTED_LOCALES.find((l) => l === primary) ?? "en";
};

export const getStoredToken = (): string | null =>
  localStorage.getItem(TOKEN_STORAGE_KEY);

export const getStoredUser = (): AuthUser | null => {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const persistSession = (token: string, user: AuthUser) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const persistUser = (user: AuthUser) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
};
