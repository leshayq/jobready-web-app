import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

// DTO для регистрации пользователя
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Електрона пошта не може бути порожньою' })
  @Length(1, 50, {
    message: 'Довжина електроної пошти не може бути більше 50 символів.',
  })
  email: string;

  @IsString({ message: "Ім'я користувача повинно бути рядкового типу" })
  @IsNotEmpty({ message: "Ім'я користувача не може бути порожнім" })
  @Length(3, 50, {
    message: 'Довжина імені користувача повинна бути від 8 до 50 символів.',
  })
  username: string;

  @IsString({ message: 'Пароль повинен бути рядкового типу' })
  @IsNotEmpty({ message: 'Пароль не може бути порожнім' })
  @Length(8, 50, {
    message: 'Довжина пароля повинна бути від 8 до 50 символів.',
  })
  password: string;
}
