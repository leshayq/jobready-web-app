import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

// Стратегия для авторизации пользователь через Google-аккаунт
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    // Инициализация переменных окружения Console Cloud Google
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    } as StrategyOptions);
  }

  // Функция-валидатор пользователя. Вызывает валидацию в authService и ищет существующего пользователя
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const userName = profile.emails[0].value;
    const user = await this.authService.validateOrCreateGoogleUser({
      email: profile.emails[0].value,
      username: userName.split('@')[0],
      password: '',
    });

    done(null, user);
  }
}
