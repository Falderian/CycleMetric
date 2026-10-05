import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class CreateTrackPointDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  activityId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  latitude: number;

  @IsInt()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  longitude: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  speed: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  accuracy: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  altitude: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  altitudeAccuracy: number;
}

export class UpdateTrackPointDto {
  @IsInt()
  @IsOptional()
  @Min(-90)
  @Max(90)
  @Type(() => Number)
  latitude?: number;

  @IsInt()
  @IsOptional()
  @Min(-180)
  @Max(180)
  @Type(() => Number)
  longitude?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  speed?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  accuracy?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  altitude?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  altitudeAccuracy?: number;
}
