import { InterviewRequestEntity } from 'src/interview-requests/entities/interview-request.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Таблица "tags" для хранения тегов к вопросам
@Entity('tags')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToMany(() => QuestionEntity, (question) => question.tags)
  questions: QuestionEntity[];

  @OneToMany(() => InterviewRequestEntity, (interview) => interview.theme)
  interviews: InterviewRequestEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
