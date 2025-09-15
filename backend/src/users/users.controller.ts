import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // DEVELOPMENT ONLY
  // Endpoint для получения всех пользователей
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }
}
