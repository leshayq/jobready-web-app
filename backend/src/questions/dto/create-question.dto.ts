import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { TagEntity } from 'src/tags/entities/tag.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { AnswerType } from '../interfaces/answer.interface';

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
