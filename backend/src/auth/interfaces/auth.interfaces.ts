import { Request } from 'express';

// Интерфейс запроса
export interface RequestWithUser extends Request {
  user: {
    id: number;
    refreshToken?: string;
  };
}

// Интерфейс данных пользователя при возврате данных
export interface UserResponse {
  id: number;
  email: string;
  username: string;
}

// Интерфейс ответа при авторизации и обнолении токенов
export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}

// Интерфейс при возврате access и refresh токенов
export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}
