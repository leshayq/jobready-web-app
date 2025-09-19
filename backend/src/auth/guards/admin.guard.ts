import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

// Guard, защищает доступ к эндпоинтам, если пользователь не админ
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (request.user?.role !== 'admin') {
      throw new ForbiddenException(
        'Питання можуть створювати лише адміністратори',
      );
    }

    return true;
  }
}
