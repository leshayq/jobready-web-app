import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { RefreshTokenGuard } from './guards/refresh-token-guard';
import { AuthResponse, RequestWithUser } from './interfaces/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    return this.authService.register(dto);
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
}
