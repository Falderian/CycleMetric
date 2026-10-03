import { defineRelations } from 'drizzle-orm';
import { activities } from '@/db/schemes/activities.schema';
import { trackPoints } from '@/db/schemes/track-points.schema';
import { users } from './users.schema';

const relations = defineRelations({ users, activities, trackPoints }, (r) => ({
  users: {
    activities: r.many.activities(),
  },
  activities: {
    trackPoints: r.many.trackPoints(),
    user: r.one.users({
      from: r.activities.id,
      to: r.users.id,
    }),
  },
  trackPoints: {
    activity: r.one.activities({
      from: r.trackPoints.activityId,
      to: r.activities.id,
    }),
  },
}));

export { relations };
