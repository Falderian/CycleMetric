import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Module({})
export class DbModule implements OnModuleInit {
  private readonly logger = new Logger(DbModule.name);

  constructor(@InjectDrizzle() private readonly db: NodePgDatabase) {}

  async onModuleInit() {
    try {
      await this.db.execute(sql`SELECT 1`);
      this.logger.log('Database connected successfully.');
    } catch (error) {
      this.logger.error('Database connection failed! Stopping application...');
      this.logger.error(error instanceof Error ? error.message : String(error));

      // Crash the process immediately so the container/app doesn't boot into a broken state
      process.exit(1);
    }
  }
}
