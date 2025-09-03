import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { InterviewRequestsModule } from './interview-requests/interview-requests.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const host = config.get<string>('DB_HOST');
        const port = parseInt(config.get<string>('DB_PORT') || '1521', 10);
        const username = config.get<string>('DB_USER');
        const password = config.get<string>('DB_PASS');
        const serviceName = config.get<string>('DB_SERVICE');
        const synchronize =
          (config.get<string>('DB_SYNCHRONIZE') || 'false') === 'true';
        const autoLoadEntities =
          (config.get<string>('DB_AUTOLOAD_ENTITIES') || 'true') === 'true';

        return {
          type: 'oracle' as const,
          host,
          port,
          username,
          password,
          serviceName,
          synchronize,
          autoLoadEntities,
        };
      },
    }),
    UsersModule,
    QuestionsModule,
    TagsModule,
    AuthModule,
    InterviewRequestsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
