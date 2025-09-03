import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PaginationParams } from '../common/dto/pagination.dto';
import { PagedResults } from 'src/common/dto/paged-results.dto';
import { formatResponse } from 'src/common/formatResponse';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('tag') tag: string,
    @Query() paginationParams: PaginationParams,
  ) {
    if (search) {
      const result = await this.questionsService.findByTitle(
        paginationParams,
        search,
      );
      return formatResponse(result);
    } else if (tag) {
      const result = await this.questionsService.findByTag(
        paginationParams,
        tag,
      );
      return formatResponse(result);
    } else {
      const result = await this.questionsService.findAll(paginationParams);
      return formatResponse(result);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Post()
  async createQuestion(@Body() dto: CreateQuestionDto) {
    return this.questionsService.createQuestion(dto);
  }
}
