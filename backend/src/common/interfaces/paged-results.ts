import { InterviewRequestEntity } from 'src/interview-requests/entities/interview-request.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';

// Интерфейс пагинации
export interface PagedResults {
  items: QuestionEntity[] | InterviewRequestEntity[];
  total: number;
  page: number;
  limit: number;
}
