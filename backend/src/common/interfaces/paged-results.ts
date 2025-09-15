import { InterviewRequestEntity } from 'src/interview-requests/entities/interview-request.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';

// Интерфейс входящих данных для пагинации
export interface ToPageResults {
  items: QuestionEntity[] | InterviewRequestEntity[];
  total: number;
  page: number;
  limit: number;
}

// Интерфейс данных с пагинацией
export interface PaginationResult {
  items: QuestionEntity[] | InterviewRequestEntity[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
