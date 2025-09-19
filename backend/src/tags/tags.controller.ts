import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './entities/tag.entity';
import { EmailConfirmationGuard } from 'src/auth/guards/email-confirmation.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // Endpoint для поиска всех тегов
  @Get()
  async findAll(): Promise<TagEntity[]> {
    return this.tagsService.findAll();
  }

  // Endpoint для создания тега
  @Post()
  @UseGuards(AuthGuard('jwt'), EmailConfirmationGuard)
  async createTag(@Body() dto: CreateTagDto): Promise<TagEntity> {
    return this.tagsService.createTag(dto);
  }
}
