import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { JwtPayload } from '@/auth/auth.types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const userId = ctx.switchToHttp().getRequest().user;
    if (!userId) throw new UnauthorizedException();
    else return userId;
  },
);
