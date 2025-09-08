import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// Guard, который проверяет валидность существующего refresh token'а юзера
@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * @returns True или UnauthorizedException
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['refreshToken'];

    if (!token) {
      throw new UnauthorizedException('Refresh-токен не знайдено.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      request['user'] = { id: payload.sub };
    } catch (e) {
      throw new UnauthorizedException('Невiрний refresh-токен.');
    }
    return true;
  }
}
