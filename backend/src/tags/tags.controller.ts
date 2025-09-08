import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // Endpoint для поиска всех тегов
  @Get()
  async findAll() {
    return this.tagsService.findAll();
  }

  // Endpoint для создания тега
  @Post()
  async createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }
}
