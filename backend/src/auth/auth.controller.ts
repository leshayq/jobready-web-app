import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { RefreshTokenGuard } from './guards/refresh-token-guard';
import {
  AuthResponse,
  RequestWithUser,
  UserResponse,
} from './interfaces/auth.interfaces';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { GoogleAuthGuard } from './guards/google-auth-guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly configService: ConfigService,
  ) {}

  // Endpoint для авторизации пользователя
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    return this.authService.login(dto, res);
  }

  // Endpoint для регистрация пользователя
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<void> {
    await this.authService.register(dto);
    await this.emailVerificationService.sendVerificationLink(dto.email);
    return;
  }

  // Endpoint для обновления refresh token'a пользователя
  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  @Post('refresh')
  async refreshTokens(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const userId = req.user.id;
    const refreshToken = req.cookies.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken, res);
  }

  // Endpoint для авторизации через Google аккаунт
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(): void {}

  // Endpoint обработчик callback Google OAuth: валидирует профиль, создаёт/находит пользователя, ставит httpOnly refresh-cookie и редиректит на фронтенд.
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res: Response): Promise<void> {
    try {
      const googleUser = req.user;
      if (!googleUser) {
        throw new UnauthorizedException('Помилка при Google-авторизації');
      }
      const tokens = await this.authService.handleGoogleUser(googleUser);
      if (!tokens) {
        throw new Error('Не вдалося згенерувати токени');
      }

      this.authService.setRefreshTokenToCookie(res, tokens.refreshToken);
      const frontendUrl =
        this.configService.get<string>('FRONTEND_URL') ||
        'http://localhost:3000';
      res.redirect(frontendUrl);
    } catch (error) {
      const frontendUrl =
        this.configService.get<string>('FRONTEND_URL') ||
        'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/google/error`);
    }
  }

  // Endpoint для выхода из аккаунта пользователя
  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  @Post('logout')
  async logout(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      // на всякий случай
      throw new ForbiddenException('Доступ заборонено');
    }
    await this.authService.logout(+userId, res);
    return;
  }
}
