import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async findAll() {
    return this.tagsService.findAll();
  }

  @Post()
  async createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }
}
