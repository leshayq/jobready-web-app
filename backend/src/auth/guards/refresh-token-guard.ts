import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['refreshToken'];

    if (!token) {
      throw new UnauthorizedException('Refresh-токен не найден.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      request['user'] = { id: payload.sub };
    } catch (e) {
      throw new UnauthorizedException('Невалидный refresh-токен.');
    }
    return true;
  }
}
