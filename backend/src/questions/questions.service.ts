import { HttpCode, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PaginationParams } from '../common/dto/pagination.dto';
import { EntityManager } from 'typeorm';
import { CreateQuestionQueryParamsDto } from './dto/create-question-query-params.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { ToPageResults } from 'src/common/interfaces/paged-results';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  // Общий сервис для поиска вопросов по возможными параметрам: (поиск; тег) с пагинацией
  async findQuestions(
    paginationParams: PaginationParams,
    filters: {
      search?: string;
      tag?: string;
    } = {},
  ): Promise<ToPageResults> {
    const page = Number(paginationParams?.page ?? 1);
    const limit = Number(paginationParams?.limit ?? 1);

    const query = this.questionsRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.tags', 'tags')
      .leftJoinAndSelect('q.author', 'author');

    let isFirstWhere = true;
    const addWhere = (condition: string, params: object) => {
      if (isFirstWhere) {
        query.where(condition, params);
        isFirstWhere = false;
      } else {
        query.andWhere(condition, params);
      }
    };

    if (filters.search) {
      const safe = filters.search.replace(/[%_]/g, (m) => `\\${m}`);
      const term = `%${safe.toLowerCase()}%`;
      addWhere('LOWER(q.title) LIKE :search', { search: term });
    }

    if (filters.tag) {
      addWhere('tags.title = :tagTitle', { tagTitle: filters.tag });
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

  // Сервис для поиска всех вопросов
  async findAll(paginationParams: PaginationParams): Promise<ToPageResults> {
    return this.findQuestions(paginationParams);
  }

  // Сервис для поиска вопросов по названию
  async findByTitle(
    paginationParams: PaginationParams,
    search: string,
  ): Promise<ToPageResults> {
    if (!search) {
      return { items: [], total: 0, page: 1, limit: 1 };
    }
    return this.findQuestions(paginationParams, { search });
  }

  // Сервис для поиска вопросов по тегу
  async findByTag(
    paginationParams: PaginationParams,
    tag: string,
  ): Promise<ToPageResults> {
    return this.findQuestions(paginationParams, { tag });
  }

  // Сервис для поиска вопроса по ID
  async findOne(id: number): Promise<QuestionEntity | null> {
    return this.questionsRepository.findOne({
      where: {
        id,
      },
      relations: ['tags'],
    });
  }

  // Сервис для cоздания вопроса
  @HttpCode(201)
  async createQuestion(
    dto: CreateQuestionDto,
    author: UserEntity,
  ): Promise<QuestionEntity> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const { title, answer, difficulty, tags } = dto;

        const question = transactionalEntityManager.create(QuestionEntity, {
          title,
          answer,
          difficulty,
          tags: tags.map((id) => ({ id })),
          author,
        });

        return transactionalEntityManager.save(question);
      },
    );
  }
}
