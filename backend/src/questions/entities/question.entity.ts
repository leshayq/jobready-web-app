import { TagEntity } from 'src/tags/entities/tag.entity';
import { UserEntity } from 'src/users/entities/user.entity';
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
import { AnswerType } from '../interfaces/answer.interface';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'simple-json', nullable: true })
  answer: AnswerType;

  @Column()
  difficulty: string;

  @ManyToMany(() => TagEntity, (tag) => tag.questions)
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(() => UserEntity, (user) => user.questions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  author: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
