// url.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicles } from '../vehicle/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Vehicles)
    private vehiclesRepository: Repository<Vehicles>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleClassDueDate() {
    const vehicles = await this.vehiclesRepository.find();
    const currentDate = new Date();
    vehicles.forEach(async (vehicle) => {
      if (vehicle.class_due_date <= currentDate) {
        vehicle.pending_maintainence = true;
        await this.vehiclesRepository.save(vehicle);
      }
    });
  }
}
