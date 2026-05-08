import { AuthResponse, User } from "@/types/auth";

const TOKEN_COOKIE = "task_manager_token";
const USER_COOKIE = "task_manager_user";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
};

const getCookie = (name: string) => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

export const saveAuth = (auth: AuthResponse) => {
  setCookie(TOKEN_COOKIE, auth.token);
  setCookie(USER_COOKIE, JSON.stringify(auth.user));
};

export const getToken = () => {
  return getCookie(TOKEN_COOKIE);
};

export const getUser = (): User | null => {
  const value = getCookie(USER_COOKIE);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as User;
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  removeCookie(TOKEN_COOKIE);
  removeCookie(USER_COOKIE);
};
