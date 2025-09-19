import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

export class GoogleAuthGuard extends AuthGuard('google') {
  // Возвращает опции для passport.authenticate
  // scope — какие данные запрашиваем у Google
  // session: false — не используем сессии (JWT / stateless flow)
  getAuthenticateOptions() {
    return { scope: ['email', 'profile'], session: false };
  }
}
