import { Module } from '@nestjs/common';
import { InterviewRequestsService } from './interview-requests.service';
import { InterviewRequestsController } from './interview-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewRequestEntity } from './entities/interview-request.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewRequestEntity]), TagsModule],
  controllers: [InterviewRequestsController],
  providers: [InterviewRequestsService],
})
export class InterviewRequestsModule {}
