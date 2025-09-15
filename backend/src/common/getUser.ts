import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

// Функция для получения текущего пользователя из запроса
export const getUser = (request: Request): UserEntity => {
  const currentUser = request.user as UserEntity;
  return currentUser;
};
