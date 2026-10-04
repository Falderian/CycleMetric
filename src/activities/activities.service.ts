import { Injectable, Logger } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { activities } from '@/db/schemes/activities.schema';
// import type { CreateActivityDto } from '@/activities/dto/create-activity.dto';
// import type { UpdateActivityDto } from '@/activities/dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectDrizzle()
    private readonly db: NodePgDatabase,
  ) {}

  create(userId: number, type: 'ride' | 'run') {
    Logger.verbose(userId, type);
    return 'This action adds a new activity';
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
