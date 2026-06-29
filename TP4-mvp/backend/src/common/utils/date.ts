import { BadRequestException } from '@nestjs/common';

export function optionalDate(value?: string): Date | undefined {
  return value ? new Date(value) : undefined;
}

export function optionalFutureDate(value?: string): Date | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date < today) {
    throw new BadRequestException('A data de inicio nao pode estar no passado.');
  }

  return date;
}
