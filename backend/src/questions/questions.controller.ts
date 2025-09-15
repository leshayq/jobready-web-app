import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { PaginationParams } from '../common/dto/pagination.dto';
import { formatResponse } from 'src/common/formatResponse';
import { CreateQuestionQueryParamsDto } from './dto/create-question-query-params.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { getUser } from 'src/common/getUser';
import { PaginationResult } from 'src/common/interfaces/paged-results';
import { QuestionEntity } from './entities/question.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // Enpoint для получения всех вопросов
  @Get()
  async findAll(
    @Query() paginationParams: PaginationParams,
    @Query() createQuestionQueryParams: CreateQuestionQueryParamsDto,
  ): Promise<PaginationResult> {
    const response = await this.questionsService.findQuestions(
      paginationParams,
      createQuestionQueryParams,
    );

    return formatResponse(response);
  }

  // Enpoint для получения вопроса по ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QuestionEntity | null> {
    return this.questionsService.findOne(+id);
  }

  // Enpoint для создания вопроса
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createQuestion(
    @Body() dto: CreateQuestionDto,
    @Req() req: Request,
  ): Promise<QuestionEntity> {
    const currentUser = getUser(req);
    return this.questionsService.createQuestion(dto, currentUser);
  }
}
