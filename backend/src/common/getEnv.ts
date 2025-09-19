import { ConfigService } from '@nestjs/config';
import { EnvironmentVariablesResponse } from './interfaces/env-variables';
import { Injectable } from '@nestjs/common';

// Класс для описания получения переменных окружения, связанных с refresh токенами
@Injectable()
export class EnvironmentVariables {
  constructor(private readonly configService: ConfigService) {}

  // Функция, которая получает все переменные окружения из файла .env
  getVariables(): EnvironmentVariablesResponse {
    const cookieName =
      this.configService.get<string>('REFRESH_COOKIE_NAME') || 'refreshToken';
    const cookiePath =
      this.configService.get<string>('REFRESH_COOKIE_PATH') || '/';
    const sameSite =
      (this.configService.get<string>('REFRESH_COOKIE_SAMESITE') as
        | 'lax'
        | 'strict'
        | 'none') || 'lax';
    const httpOnly =
      this.configService.get<boolean>('REFRESH_COOKIE_HTTPONLY') ?? true;
    const secure = this.configService.get<string>('NODE_ENV') === 'production';

    return {
      cookieName,
      cookiePath,
      sameSite,
      httpOnly,
      secure,
    };
  }
}
