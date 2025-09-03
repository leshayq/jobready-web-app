import { InterviewRequestEntity } from 'src/interview-requests/entities/interview-request.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';

export interface PagedResults {
  items: QuestionEntity[] | InterviewRequestEntity[];
  total: number;
  page: number;
  limit: number;
}
