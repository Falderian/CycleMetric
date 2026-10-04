import type { Request } from 'express';

export interface JwtPayload {
  sub: number;
  login: string;
}

export type RequestWithUser = Request & { user: JwtPayload };
