import { IsString, IsNotEmpty } from 'class-validator';

// DTO для подтверждения эмейла. Используется в контроллере email verification
export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
