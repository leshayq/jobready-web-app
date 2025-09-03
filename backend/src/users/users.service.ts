import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findById(userId: number) {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  @HttpCode(201)
  async createUser(dto: RegisterDto) {
    const { email, username, password } = dto;
    const role = 'user';

    const salt = await genSalt(10);

    const user = this.userRepository.create({
      email,
      username,
      role,
      password: await hash(password, salt),
    });

    return this.userRepository.save(user);
  }

  async updateUser(userId: number, updateData: Partial<UserEntity>) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('Користувач не знайдений');
    }
    return await this.userRepository.update(userId, updateData);
  }
}
