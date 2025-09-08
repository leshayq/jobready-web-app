import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

/**
 * Интерсептор для преобразования ответов контроллеров в унифицированный формат.
 *
 * Все успешные ответы автоматически оборачиваются в объект:
 *
 * ```json
 * {
 *   "success": true,
 *   "data": any
 * }
 * ```
 *
 * Если возвращаемый объект уже содержит поле `success`, то ответ остаётся без изменений.
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }
        return { success: true, data: data ?? null };
      }),
    );
  }
}
