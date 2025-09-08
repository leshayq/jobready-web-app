import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

// DTO для авторизация пользователя
export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Електрона пошта не може бути порожньою' })
  email: string;

  @IsString({ message: 'Пароль повинен бути рядкового типу' })
  @IsNotEmpty({ message: 'Пароль не може бути порожнім' })
  @Length(8, 50, {
    message: 'Довжина пароля повинна бути від 8 до 50 символів.',
  })
  password: string;
}
