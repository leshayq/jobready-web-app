import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InterviewRequestsService } from './interview-requests.service';
import { CreateInterviewRequestDto } from './dto/create-interview-request.dto';
import { PaginationParams } from 'src/common/dto/pagination.dto';
import { format } from 'path';
import { formatResponse } from 'src/common/formatResponse';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('interview-requests')
export class InterviewRequestsController {
  constructor(
    private readonly interviewRequestsService: InterviewRequestsService,
  ) {}

  @Get()
  async findAll(
    @Query() paginationParams: PaginationParams,
    @Query('user') userId?: number,
  ) {
    const result = await this.interviewRequestsService.findAll(
      paginationParams,
      userId,
    );
    return formatResponse(result);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createInterviewRequest(
    @Body() dto: CreateInterviewRequestDto,
    @Req() req: Request,
  ) {
    const currentUser = req.user as UserEntity;
    console.log(currentUser);

    return this.interviewRequestsService.createInterviewRequest(
      dto,
      currentUser,
    );
  }

  @Delete(':id')
  async deleteInterviewRequest(@Param('id') id: string) {
    return this.interviewRequestsService.deleteInterviewRequest(+id);
  }
}
