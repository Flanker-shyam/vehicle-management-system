// url.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor() {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleExpiredUrls() {}
}
