import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { activities } from '@/db/schemes/activities.schema';
import { trackPoints } from '@/db/schemes/track-points.schema';
import { users } from '@/db/schemes/users.schema';
import { CreateTrackPointDto } from './dto/track-points.dto';
@Injectable()
export class ActivitiesService {
  constructor(
    @InjectDrizzle()
    private readonly db: NodePgDatabase,
  ) {}

  async create(userId: number, type: 'ride' | 'run') {
    const [isUserExists] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!isUserExists) throw new NotFoundException('User not found');
    const [res] = await this.db
      .insert(activities)
      .values({ userId, type })
      .returning();
    return res.id;
  }

  async createTrackPoints(dto: CreateTrackPointDto) {
    const [isActivityExists] = await this.db
      .select()
      .from(activities)
      .where(eq(activities.id, dto.activityId));
    if (!isActivityExists) throw new NotFoundException('Activitity not found');

    const [res] = await this.db.insert(trackPoints).values(dto).returning();
    return res.id;
  }

  findAll() {
    return this.db.select().from(activities);
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  //   update(id: number, updateActivityDto: UpdateActivityDto) {
  //     return `This action updates a #${id} activity`;
  //   }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
