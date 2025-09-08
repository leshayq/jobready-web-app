import { IsNotEmpty, IsString } from 'class-validator';

// DTO для создания тега
export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
