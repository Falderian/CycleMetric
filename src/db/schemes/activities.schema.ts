import { date, integer } from 'drizzle-orm/pg-core';
import { dbSchema } from '@/db/schemes/schema';
import { users } from './users.schema';

const activities = dbSchema.table('activities', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: date().defaultNow(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});

type Activity = typeof activities.$inferSelect;
type NewActivity = typeof activities.$inferInsert;

export { type Activity, activities, type NewActivity };
