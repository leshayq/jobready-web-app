import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * Глобальный фильтр для обработки всех исключений в приложении.
 *
 * Этот фильтр перехватывает любые ошибки, возникшие в процессе обработки запроса,
 * и возвращает унифицированный JSON-ответ в формате:
 *
 * ```json
 * {
 *   "success": false,
 *   "error": {
 *     "statusCode": number,
 *     "message": string | object
 *   }
 * }
 * ```
 *
 * - Если ошибка является экземпляром `HttpException`, то берётся её статус и сообщение.
 * - Если ошибка неизвестного типа, возвращается `500 Internal Server Error`.
 */

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as any);

    if (typeof message === 'object' && (message as any).message) {
      message = (message as any).message;
    }

    if (status >= 500) {
      this.logger.error(
        `[${request.method} ${request.url}] - Статус: ${status}`,
        exception instanceof Error ? exception.stack : exception,
      );
    }

    response.status(status).json({
      success: false,
      error: {
        statusCode: status,
        message,
      },
    });
  }
}
