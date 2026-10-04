import { BadRequestException, type PipeTransform } from '@nestjs/common';
import { ZodError, type ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          error.issues.map(
            (issue) => `${issue.path.join('.') || 'value'}: ${issue.message}`,
          ),
        );
      }
      throw error;
    }
  }
}
