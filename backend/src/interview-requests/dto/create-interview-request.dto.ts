import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { TagEntity } from 'src/tags/entities/tag.entity';
import { ManyToOne } from 'typeorm';

export enum InterviewDifficulty {
  JUNIOR = 'Junior',
  MIDDLE = 'Middle',
  SENIOR = 'Senior',
}

// DTO для создания запроса собеседования (InterviewRequestEntity)
export class CreateInterviewRequestDto {
  @IsString({ message: 'Назва повинна бути рядкового типу' })
  @IsNotEmpty({ message: 'Назва не може бути порожньою' })
  @Length(1, 50, {
    message: 'Довжина назви повинна бути від 1 до 50 символів.',
  })
  title: string;

  @IsEnum(InterviewDifficulty, {
    message: 'Рівень повинен бути одним з 3 значень: Junior, Middle, Senior',
  })
  @IsNotEmpty({ message: 'Рівень складності не може бути порожнім' })
  difficulty: InterviewDifficulty;

  @IsNotEmpty({ message: 'Тема не може бути порожньою' })
  theme: TagEntity;

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
