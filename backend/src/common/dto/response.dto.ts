export interface SuccessResponseDto<T = any> {
  success: true;
  data: T;
}

export interface ErrorResponseDto {
  success: false;
  error: {
    statusCode: number;
    message: string;
  };
}
