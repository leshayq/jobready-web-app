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

  async findAll() {
    return this.tagsRepository.find();
  }

  async findByTitle(title: string) {
    return this.tagsRepository.findOne({
      where: {
        title,
      },
    });
  }

  async validateTheme(theme: string) {
    const tag = await this.findByTitle(theme);
    if (!tag) return false;
    return true;
  }

  @HttpCode(201)
  async createTag(dto: CreateTagDto) {
    const { title } = dto;

    const tag = this.tagsRepository.create({
      title,
    });

    return this.tagsRepository.save(tag);
  }
}
