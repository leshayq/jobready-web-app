import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { Like, Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PaginationParams } from '../common/dto/pagination.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
  ) {}

  async findQuestions(
    paginationParams: PaginationParams,
    filters: {
      search?: string;
      tag?: string;
    } = {},
  ) {
    const page = Number(paginationParams?.page ?? 1);
    const limit = Number(paginationParams?.limit ?? 1);

    const query = this.questionsRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.tags', 'tags')
      .leftJoinAndSelect('q.author', 'author');

    if (filters.search) {
      const safe = filters.search.replace(/[%_]/g, (m) => `\\${m}`);
      const term = `%${safe.toLowerCase()}%`;

      query.where('LOWER(q.title) LIKE :search', { search: term });
    }

    if (filters.tag) {
      query.where('tags.title = :tagTitle', { tagTitle: filters.tag });
    }

    const [items, total] = await query
      .skip(((page ?? 1) - 1) * (limit ?? 1))
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async findAll(paginationParams: PaginationParams) {
    return this.findQuestions(paginationParams);
  }

  async findByTitle(paginationParams: PaginationParams, search: string) {
    if (!search) {
      return { items: [], total: 0, page: 1, limit: 1 };
    }
    return this.findQuestions(paginationParams, { search });
  }

  async findByTag(paginationParams: PaginationParams, tag: string) {
    return this.findQuestions(paginationParams, { tag });
  }

  async findOne(id: number) {
    return this.questionsRepository.findOne({
      where: {
        id,
      },
      relations: ['tags'],
    });
  }

  @HttpCode(201)
  async createQuestion(dto: CreateQuestionDto) {
    const { title, answer, difficulty, tags, author } = dto;

    const question = this.questionsRepository.create({
      title,
      answer,
      difficulty,
      tags: tags.map((id) => ({ id })),
      author,
    });

    return this.questionsRepository.save(question);
  }
}
