import { Injectable } from '@nestjs/common';
import nodemailer, {
  Transporter,
  SendMailOptions,
  createTransport,
} from 'nodemailer';
import { ConfigService } from '@nestjs/config';

// Класс отправки электронных писем
@Injectable()
export class MailService {
  private nodemailerTransport: Transporter;

  // Инициализация сервиса отправки эмейла, получение необходимых переменных окружения
  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: +this.configService.get('EMAIL_PORT'),
      secure: this.configService.get('EMAIL_SECURE') === 'true',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  // Функция для отправки эмейла
  sendMail(options: SendMailOptions) {
    return this.nodemailerTransport.sendMail(options);
  }
}
