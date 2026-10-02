import { defineRelations } from 'drizzle-orm';
import { activities } from '@/db/schemes/activities.schema';
import { trackPoints } from '@/db/schemes/track-points.schema';

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
