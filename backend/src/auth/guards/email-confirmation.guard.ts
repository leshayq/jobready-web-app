import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

// Guard, защищает доступ к эндпоинтам, если у пользователя не активирован аккаунт (не подтверждена электронная почта)
@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // пропустить проверку, если пользователя нет, передаем выполнение программы валидаторам и dto
    if (!request.user) {
      return true;
    }

    if (!request.user?.isActive) {
      throw new UnauthorizedException(
        'Спочатку підтвердіть свою електронну пошту',
      );
    }

    return true;
  }
}
