import { IsIn } from 'class-validator';

export class CreateActivityDto {
  @IsIn(['ride', 'run'])
  type: 'ride' | 'run';
}
