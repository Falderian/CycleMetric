import { date, integer } from "drizzle-orm/pg-core";
import { activities } from "./activities.schema.js";
import { dbSchema } from "./schema.js";

const trackPoints = dbSchema.table("track-points", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activities.id),
  createdAt: date(),
  latitude: integer().notNull(),
  longitude: integer().notNull(),
  speed: integer(),
  accuracy: integer(),
  altitude: integer(),
  altitudeAccuracy: integer(),
});

type TrackPoint = typeof trackPoints.$inferSelect;
type NewTrackPoint = typeof trackPoints.$inferInsert;

export { type NewTrackPoint, type TrackPoint, trackPoints };
