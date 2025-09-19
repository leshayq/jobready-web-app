import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { VerificationTokenPayload } from './interfaces/verificationTokenPayload.interface';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  // Отправляет письмо с ссылкой подтверждения
  public async sendVerificationLink(email: string) {
    // Токен-пэйлоад
    const payload: VerificationTokenPayload = { email };

    // Подписываем JWT
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: `${this.configService.get<number | string>('EMAIL_VERIFICATION_EXPIRES')}s`,
    });

    // Ссылка подтверждения
    const url = `${this.configService.get<string>('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    // Текст письма
    const text = `Ласкаво просимо до JobReady. Щоб підтвердити адресу електронної пошти, натисніть тут: ${url}`;

    // Отправляем письмо и возвращаем результат
    return this.mailService.sendMail({
      to: email,
      subject: 'Підтвердження електронної пошти',
      text,
    });
  }

  // Подтверждает email: помечает пользователя как активного
  public async confirmEmail(email: string) {
    // Ищем пользователя по емейлу
    const user = await this.usersService.findByEmail(email);

    // Если уже активен — ошибка
    if (user?.isActive) {
      throw new BadRequestException('Електронна пошта вже підтверджена');
    }

    // Если найден — помечаем как подтверждённый
    if (user) {
      await this.usersService.markEmailAsConfirmed(user);
    } else {
      // Если нет в БД — 404
      throw new NotFoundException('Користувача не знайдено');
    }
  }

  // Декодирует и валидирует токен, возвращает email
  public async decodeConfirmationToken(token: string) {
    try {
      // Верифицируем токен
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Проверяем наличие email в пэйлоаде
      if (typeof payload === 'object' && 'email' in payload) {
        return (payload as VerificationTokenPayload).email;
      }

      // Невалидный payload
      throw new BadRequestException('Невалідний payload токена');
    } catch (error: any) {
      // Токен просрочен
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException(
          'Термін дії токена підтвердження електронної пошти минув',
        );
      }
      // Любая другая ошибка — невалидный токен
      throw new BadRequestException('Невалідний токен');
    }
  }
}
