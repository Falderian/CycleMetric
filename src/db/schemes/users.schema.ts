import { date, integer, varchar } from 'drizzle-orm/pg-core';
import { dbSchema } from '@/db/schemes/schema';

const users = dbSchema.table('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  login: varchar().notNull().unique(),
  password: varchar().notNull(),
  createdAt: date().defaultNow(),
});

type User = typeof users.$inferSelect;
type NewUser = typeof users.$inferInsert;

export { type NewUser, type User, users };
