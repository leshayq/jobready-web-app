import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AnswerType } from '../interfaces/answer.interface';

// DTO для создания вопроса (QuestionEntity)
export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  answer: AnswerType;

  @IsString()
  @IsNotEmpty()
  difficulty: string;

  @IsArray()
  @IsNotEmpty()
  tags: number[];

  @IsNotEmpty()
  author: UserEntity;
}
