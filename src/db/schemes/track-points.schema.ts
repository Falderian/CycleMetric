import { integer, timestamp } from 'drizzle-orm/pg-core';
import { activities } from '@/db/schemes/activities.schema';
import { dbSchema } from '@/db/schemes/schema';

const trackPoints = dbSchema.table('track-points', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  activityId: integer('activity_id')
    .notNull()
    .references(() => activities.id),
  latitude: integer().notNull(),
  longitude: integer().notNull(),
  speed: integer().notNull(),
  accuracy: integer().notNull(),
  altitude: integer().notNull(),
  altitudeAccuracy: integer().notNull(),
  createdAt: timestamp().defaultNow(),
});

type TrackPoint = typeof trackPoints.$inferSelect;
type NewTrackPoint = typeof trackPoints.$inferInsert;

export { type NewTrackPoint, type TrackPoint, trackPoints };
