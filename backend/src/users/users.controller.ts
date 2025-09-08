import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // DEVELOPMENT ONLY
  // Endpoint для получения всех пользователей
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Endpoint для создания нового пользователя
  @Post()
  async createUser(@Body() dto: RegisterDto) {
    return this.usersService.createUser(dto);
  }
}
