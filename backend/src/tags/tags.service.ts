import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
  ) {}

  // Сервис для поиска всех тегов
  async findAll(): Promise<TagEntity[]> {
    return this.tagsRepository.find();
  }

  // Сервис для поиска тегов по названию
  async findByTitle(title: string): Promise<TagEntity | null> {
    return this.tagsRepository.findOne({
      where: {
        title,
      },
    });
  }

  // Функция-валидатор для проверки существования тега по названию (theme)
  async validateTheme(theme: string): Promise<boolean> {
    const tag = await this.findByTitle(theme);
    if (!tag) return false;
    return true;
  }

  // Сервис для создания тега
  @HttpCode(201)
  async createTag(dto: CreateTagDto): Promise<TagEntity> {
    const { title } = dto;

    const tag = this.tagsRepository.create({
      title,
    });

    return this.tagsRepository.save(tag);
  }
}
