import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DrizzleModule } from '@nestjs/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { ActivitiesModule } from '@/activities/activities.module';
import { AuthModule } from '@/auth/auth.module';
import { DbModule } from '@/db/db.module';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        drizzle,
        connection: configService.getOrThrow<string>('DATABASE_URL'),
      }),
    }),
    AuthModule,
    DbModule,
    ActivitiesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
