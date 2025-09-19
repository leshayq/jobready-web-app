import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
} from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { VerifyEmailDto } from './dto/verify-email.dto';

/// Класс подтверждения аккаунта путем отправки эмейла
@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailVerificationController {
  emailConfirmationService: any;
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  // Endpoint для подтверждения электронной почты
  @Post('confirm')
  async confirm(@Body() verificationData: VerifyEmailDto) {
    const email = await this.emailVerificationService.decodeConfirmationToken(
      verificationData.token,
    );
    await this.emailVerificationService.confirmEmail(email);
  }
}
