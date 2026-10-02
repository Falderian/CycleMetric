import { date, integer } from "drizzle-orm/pg-core";
import { dbSchema } from "./schema.js";

const activities = dbSchema.table("activities", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: date().defaultNow(),
});

type Activity = typeof activities.$inferSelect;
type NewActivity = typeof activities.$inferInsert;

export { type Activity, activities, type NewActivity };
