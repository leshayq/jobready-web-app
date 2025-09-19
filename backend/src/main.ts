import { NestFactory, Reflector } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { join } from 'path';
import { CustomLogger } from './common/logger/logger.service';

// Точка входа в приложение
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const frontend = configService.get<string>('FRONTEND_URL');

  // Валидация входящих DTO через глобальный ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);

  // Подключение глобальных интерсепторов и фильтров ошибок
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: frontend,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Устанавка глобального префикс для API (`/api`)
  app.setGlobalPrefix('api');
  // Подключение cookie-parser для работы с JWT/сессиями
  app.use(cookieParser());
  // Использование кастомного логгера
  app.useLogger(new CustomLogger());

  const port = configService.get<number>('PORT') || 3000;

  // Статические файлы React frontend (из `client/dist`)
  const clientPath = join(__dirname, '..', 'client/dist');
  app.use(express.static(clientPath));
  // Все запросы GET, не начинающиеся с `/api`, редиректятся на `index.html`
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      res.sendFile(join(clientPath, 'index.html'));
    } else {
      next();
    }
  });

  await app.listen(port, '0.0.0.0');
}
bootstrap();
