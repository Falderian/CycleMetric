import { Module } from "@nestjs/common";
import { DrizzleModule } from "@nestjs/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";

@Module({
  imports: [
    DrizzleModule.forRoot({
      drizzle,
      connection: process.env.DATABASE_URL || "",
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
