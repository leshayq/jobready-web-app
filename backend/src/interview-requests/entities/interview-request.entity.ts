import { TagEntity } from 'src/tags/entities/tag.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Таблица "interview_requests" для хранения запросов собеседований
@Entity('interview_requests')
export class InterviewRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  difficulty: string;

  @ManyToOne(() => TagEntity, (theme) => theme.interviews)
  theme: TagEntity;

  @Column()
  date: string;

  @Column({ nullable: true })
  additionalInfo: string;

  @ManyToOne(() => UserEntity, (user) => user.interviewRequests)
  author: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
