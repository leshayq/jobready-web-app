import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EnvironmentVariables } from 'src/common/getEnv';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { EmailVerificationModule } from 'src/email-verification/email-verification.module';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_ACCESS_EXPIRES'),
        },
      }),
    }),
    UsersModule,
    EmailVerificationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EnvironmentVariables, GoogleStrategy],
})
export class AuthModule {}
