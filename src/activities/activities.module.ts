import { Module } from '@nestjs/common';
import { ActivitiesController } from '@/activities/activities.controller';
import { ActivitiesService } from '@/activities/activities.service';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
