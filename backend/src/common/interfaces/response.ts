// Интерфейс ответа при успешном исполнении кода при возврате данных
export interface SuccessResponseDto<T = any> {
  success: true;
  data: T;
}

// Интерфейс ответа кода с ошибкой при возврате данных
export interface ErrorResponseDto {
  success: false;
  error: {
    statusCode: number;
    message: string;
  };
}
