import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from '@/activities/activities.service';
import { CreateActivityDto } from '@/activities/dto/create-activity.dto';
import type { JwtPayload } from '@/auth/auth.types';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CurrentUser } from '@/common/utils';
import { CreateTrackPointDto } from './dto/track-points.dto';

@UseGuards(JwtAuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    return await this.activitiesService.create(
      user.sub,
      createActivityDto.type,
    );
  }

  @Post('track-points')
  async createTrackPoints(@Body() dto: CreateTrackPointDto) {
    return await this.activitiesService.createTrackPoints(dto);
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
  //   return this.activitiesService.update(+id, updateActivityDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
