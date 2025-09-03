import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewRequestEntity } from './entities/interview-request.entity';
import { Repository } from 'typeorm';
import { CreateInterviewRequestDto } from './dto/create-interview-request.dto';
import { validateDifficulty } from './validators/validators';
import { TagsService } from 'src/tags/tags.service';
import { PaginationParams } from 'src/common/dto/pagination.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class InterviewRequestsService {
  constructor(
    @InjectRepository(InterviewRequestEntity)
    private readonly interviewRequestsRepository: Repository<InterviewRequestEntity>,
    private readonly tagsService: TagsService,
  ) {}

  async findAll(paginationParams: PaginationParams, userId?: number) {
    const page = Number(paginationParams?.page ?? 1);
    const limit = Number(paginationParams?.limit ?? 1);
    let query: any;

    if (userId) {
      query = this.interviewRequestsRepository
        .createQueryBuilder('ir')
        .leftJoinAndSelect('ir.author', 'author')
        .where('author.id = :userId', { userId });
    } else {
      query = this.interviewRequestsRepository
        .createQueryBuilder('ir')
        .leftJoinAndSelect('ir.author', 'author');
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

  async findById(id: number) {
    console.log(id, 'запрос на удаление interview');
    const interviewRequest = await this.interviewRequestsRepository.findOne({
      where: { id },
    });

    if (!interviewRequest) {
      throw new NotFoundException('Запит на співбесіду не знайдено');
    }

    console.log(interviewRequest, 'інтервью реквест');
    return interviewRequest;
  }

  async createInterviewRequest(
    dto: CreateInterviewRequestDto,
    user: UserEntity,
  ) {
    const { title, date, theme, difficulty, additionalInfo } = dto;
    if (!validateDifficulty(difficulty))
      throw new BadRequestException(
        'Рівень повинен бути одним з 3 значень: Junior, Middle, Senior',
      );

    const themeValidation = await this.tagsService.validateTheme(theme);
    if (!themeValidation) {
      throw new NotFoundException('Вказана тема не існує');
    }
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

  async deleteInterviewRequest(id: number) {
    const interviewRequest = await this.findById(id);

    return await this.interviewRequestsRepository.remove(interviewRequest);
  }
}
