import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewRequestEntity } from './entities/interview-request.entity';
import { Repository } from 'typeorm';
import { CreateInterviewRequestDto } from './dto/create-interview-request.dto';
import { PaginationParams } from 'src/common/dto/pagination.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { ToPageResults } from 'src/common/interfaces/paged-results';

@Injectable()
export class InterviewRequestsService {
  constructor(
    @InjectRepository(InterviewRequestEntity)
    private readonly interviewRequestsRepository: Repository<InterviewRequestEntity>,
  ) {}

  // Сервис для поиска всех запросов собеседований с пагинацией
  async findAll(
    paginationParams: PaginationParams,
    userId?: number,
  ): Promise<ToPageResults> {
    const page = Number(paginationParams?.page ?? 1);
    const limit = Number(paginationParams?.limit ?? 1);
    const query = this.interviewRequestsRepository
      .createQueryBuilder('ir')
      .leftJoinAndSelect('ir.author', 'author');

    if (userId) {
      query.where('author.id  = :userId', { userId });
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

  // Сервис для поиска запроса собеседований по ID
  async findById(id: number): Promise<InterviewRequestEntity> {
    const interviewRequest = await this.interviewRequestsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!interviewRequest) {
      throw new NotFoundException('Запит на співбесіду не знайдено');
    }

    return interviewRequest;
  }

  // Сервис для создания запроса собеседования
  async createInterviewRequest(
    dto: CreateInterviewRequestDto,
    user: UserEntity,
  ): Promise<InterviewRequestEntity> {
    const { title, date, theme, difficulty, additionalInfo } = dto;

    const interviewRequest = await this.interviewRequestsRepository.create({
      title,
      theme,
      date,
      difficulty,
      additionalInfo,
      author: user,
    });
    return await this.interviewRequestsRepository.save(interviewRequest);
  }

  // Сервис для удаления запроса собеседования
  async deleteInterviewRequest(
    id: number,
    user: UserEntity,
  ): Promise<InterviewRequestEntity> {
    const interviewRequest = await this.findById(id);

    if (!user) {
      throw new BadRequestException('Користувач не авторизований');
    }
    if (interviewRequest.author.id !== user.id) {
      throw new BadRequestException(
        'Ви не можете видалити цей запит на співбесіду',
      );
    }

    return await this.interviewRequestsRepository.remove(interviewRequest);
  }
}
