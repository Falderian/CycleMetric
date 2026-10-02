import { defineRelations } from "drizzle-orm";
import { activities } from "./activities.schema.js";
import { trackPoints } from "./track-points.schema.js";

const relations = defineRelations({ activities, trackPoints }, (r) => ({
  activities: {
    trackPoints: r.many.trackPoints(),
  },
  trackPoints: {
    activity: r.one.activities({
      from: r.trackPoints.activityId,
      to: r.activities.id,
    }),
  },
}));

export { relations };
