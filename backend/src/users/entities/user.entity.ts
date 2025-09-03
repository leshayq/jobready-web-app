import { InterviewRequestEntity } from 'src/interview-requests/entities/interview-request.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ name: 'hashed_refresh_token', type: 'varchar', nullable: true })
  hashedRefreshToken: string | null;

  @OneToMany(() => QuestionEntity, (question) => question.author)
  questions: QuestionEntity[];

  @OneToMany(
    () => InterviewRequestEntity,
    (interviewRequest) => interviewRequest.author,
  )
  interviewRequests: InterviewRequestEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
