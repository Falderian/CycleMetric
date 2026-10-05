import { integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { dbSchema } from '@/db/schemes/schema';
import { users } from './users.schema';

const activities = dbSchema.table('activities', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  type: varchar().notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp({ mode: 'date' }).defaultNow(),
  updatedAt: timestamp({ mode: 'date' })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

type Activity = typeof activities.$inferSelect;
type NewActivity = typeof activities.$inferInsert;

export { type Activity, activities, type NewActivity };
