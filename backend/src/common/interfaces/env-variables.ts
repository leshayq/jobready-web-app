import { CookieOptions } from 'express';

// Интерфейс для переменных из окружения .env
export interface EnvironmentVariablesResponse {
  cookieName: string;
  cookiePath: string;
  sameSite: CookieOptions['sameSite'];
  httpOnly: boolean;
  secure: boolean;
}
