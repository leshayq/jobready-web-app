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
import {
  AuthResponse,
  TokensResponse,
  UserResponse,
} from './interfaces/auth.interfaces';
import { EnvironmentVariables } from 'src/common/getEnv';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly envVars: EnvironmentVariables,
  ) {}

  // Сервис авторизация пользователя
  async login(dto: LoginDto, res: Response): Promise<AuthResponse> {
    const user = await this.validateUser(dto);

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Спочатку підтвердіть свою електронну пошту',
      );
    }

    const tokens = await this.issueTokenPair(+user.id);

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    this.setRefreshTokenToCookie(res, tokens.refreshToken);

    return {
      user: await this.returnUserFields(user),
      accessToken: tokens.accessToken,
    };
  }

  // Сервис регистрации пользователя
  async register(dto: RegisterDto): Promise<void> {
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
  async refreshTokens(
    userId: number,
    refreshToken: string,
    res: Response,
  ): Promise<AuthResponse> {
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
  async validateUser(dto: LoginDto): Promise<UserEntity> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Невірний e-mail або пароль');

    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword)
      throw new UnauthorizedException('Невірний e-mail або пароль');
    return user;
  }

  // Сервис генерации токенов
  async issueTokenPair(userId: number): Promise<TokensResponse> {
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
  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.usersService.updateUser(userId, {
      hashedRefreshToken,
    });
  }

  // Сервис-сеттер refresh токена в cookies
  setRefreshTokenToCookie(res: Response, refreshToken: string): void {
    const { cookieName, cookiePath, sameSite, httpOnly, secure } =
      this.envVars.getVariables();

    res.cookie(cookieName, refreshToken, {
      httpOnly,
      secure,
      sameSite,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: cookiePath,
    });
  }

  // Сервис-форматтер, возвращает объект пользователя с полями (id, email, username)
  async returnUserFields(user: UserEntity): Promise<UserResponse> {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }

  // Сервис-валидатор, проверяет наличие уже существующего аккаунта при входе через Google
  // через email и username и создает нового
  async validateOrCreateGoogleUser(googleUser: RegisterDto) {
    const user = await this.usersService.findByEmail(googleUser.email);
    if (user) return user;

    const user2 = await this.usersService.findByUsername(googleUser.username);
    if (user2) return user2;

    return await this.usersService.createUser(googleUser);
  }

  // Функция, которая проверяет существующего или создает нового пользователя при входе через Google
  // и авторизует его
  async handleGoogleUser(googleUser: UserEntity) {
    const user = await this.validateOrCreateGoogleUser({
      email: googleUser.email,
      username: googleUser.username.split('@')[0],
      password: '',
    });

    user.isActive = true;
    const tokens = await this.issueTokenPair(+user.id);

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
    return tokens;
  }

  // Сервис, выход из аккаунта пользователя
  async logout(userId: number, res: Response) {
    await this.usersService.updateUser(userId, {
      hashedRefreshToken: null,
    });

    const { cookieName, cookiePath, sameSite, httpOnly, secure } =
      this.envVars.getVariables();

    try {
      res.clearCookie(cookieName, {
        httpOnly,
        secure,
        sameSite,
        path: cookiePath,
      });
    } catch (e) {
      res.cookie(cookieName, '', {
        httpOnly,
        secure,
        sameSite,
        expires: new Date(0),
        path: cookiePath,
      });
    }
  }
}
