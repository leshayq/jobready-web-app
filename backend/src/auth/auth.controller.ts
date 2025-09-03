import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { RefreshTokenGuard } from './guards/refresh-token-guard';

interface RequestWithUser extends Request {
  user: {
    id: number;
    refreshToken?: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(dto, res);
  }

  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  @Post('refresh')
  async refreshTokens(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user.id;
    const refreshToken = req.cookies.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken, res);
  }
}
