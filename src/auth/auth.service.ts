import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { type User, users } from '@/db/schemes/users.schema';
import type { JwtPayload } from './auth.types.js';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectDrizzle() private readonly db: NodePgDatabase,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: string, password: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.login, login))
      .limit(1);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueToken(user);
  }

  async register(login: string, password: string) {
    const [existing] = await this.db
      .select()
      .from(users)
      .where(eq(users.login, login))
      .limit(1);

    if (existing) {
      throw new ConflictException('Login already taken');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const [user] = await this.db
      .insert(users)
      .values({ login, password: passwordHash })
      .returning();

    return this.issueToken(user);
  }

  async validateUser(payload: JwtPayload) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, payload.sub))
      .limit(1);

    return user;
  }

  private async issueToken(user: User) {
    const payload: JwtPayload = { sub: user.id, login: user.login };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
