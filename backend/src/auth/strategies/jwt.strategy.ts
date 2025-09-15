import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

/**
 * JWT стратегия для аутентификации пользователей.
 *
 * Стратегия интегрируется с `@nestjs/passport`.
 * Если токен валиден и пользователь существует, возвращает `UserEntity`.
 * В противном случае выбрасывает `UnauthorizedException`.
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKeyProvider: async () => configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * @returns UserEntity или UnauthorizedException
   */
  async validate(payload: { sub: number }): Promise<UserEntity> {
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
