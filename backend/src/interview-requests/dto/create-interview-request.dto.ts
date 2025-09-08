import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

// DTO для создания запроса собеседования (InterviewRequestEntity)
export class CreateInterviewRequestDto {
  @IsString({ message: 'Назва повинна бути рядкового типу' })
  @IsNotEmpty({ message: 'Назва не може бути порожньою' })
  @Length(1, 50, {
    message: 'Довжина назви повинна бути від 1 до 50 символів.',
  })
  title: string;

  @IsString({ message: 'Рівень складності повинен бути рядкового типу' })
  @IsNotEmpty({ message: 'Рівень складності не може бути порожнім' })
  difficulty: string;

  @IsString({ message: 'Тема повинна бути рядкового типу' })
  @IsNotEmpty({ message: 'Тема не може бути порожньою' })
  theme: string;

  @IsString({ message: 'Дата повинна бути рядкового типу' })
  @IsNotEmpty({ message: 'Дата не може бути порожньою' })
  date: string;

  @IsString({ message: 'Додаткова інформація повинна бути рядкового типу' })
  @IsOptional()
  @MaxLength(500, {
    message: 'Максимальна довжина додаткової інформації - 500 символів.',
  })
  additionalInfo: string;
}
