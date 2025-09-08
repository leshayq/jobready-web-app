import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Сервис авторизация пользователя
  async login(dto: LoginDto, res: Response) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokenPair(+user.id);

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    this.setRefreshTokenToCookie(res, tokens.refreshToken);

    return {
      user: await this.returnUserFields(user),
      accessToken: tokens.accessToken,
    };
  }

  // Сервис регистрации пользователя
  async register(dto: RegisterDto) {
    const oldUser = await this.usersService.findByEmail(dto.email);
    const oldUser2 = await this.usersService.findByUsername(dto.username);
    if (oldUser || oldUser2)
      throw new BadRequestException(
        'Користувач з вказаним e-mail або іменем користувача вже існує',
      );

    const user = await this.usersService.createUser(dto);
    return;
  }

  // Сервис обновления токенов пользователя
  async refreshTokens(userId: number, refreshToken: string, res: Response) {
    const user = await this.usersService.findById(+userId);
    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('Доступ заборонено');
    }

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!isRefreshTokenMatching) {
      throw new ForbiddenException('Доступ заборонено. Невiрний токен');
    }

    const tokens = await this.issueTokenPair(user.id);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    this.setRefreshTokenToCookie(res, tokens.refreshToken);

    return {
      user: await this.returnUserFields(user),
      accessToken: tokens.accessToken,
    };
  }

  // Сервис валидации пользователя (поиск пользователя в бд и сравнение паролей)
  async validateUser(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Невірний e-mail або пароль)');

    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword)
      throw new UnauthorizedException('Невірний e-mail або пароль');
    return user;
  }

  // Сервис генерации токенов
  async issueTokenPair(userId: number) {
    const data = { sub: userId };

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  // Сервис обновления refresh токена
  private async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.usersService.updateUser(userId, {
      hashedRefreshToken,
    });
  }

  // Сервис-сеттер refresh токена в cookies
  private setRefreshTokenToCookie(res: Response, refreshToken: string) {
    const cookieName =
      this.configService.get<string>('REFRESH_COOKIE_NAME') || 'refreshToken';
    const cookiePath = '/';
    const sameSite =
      (this.configService.get<string>('REFRESH_COOKIE_SAMESITE') as
        | 'lax'
        | 'strict'
        | 'none') || 'lax';
    const httpOnly =
      this.configService.get<boolean>('REFRESH_COOKIE_HTTPONLY') ?? true;
    const secure = this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie(cookieName, refreshToken, {
      httpOnly,
      secure,
      sameSite,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: cookiePath,
    });
  }

  // Сервис-форматтер, возвращает объект пользователя с полями (id, email, username)
  async returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}
