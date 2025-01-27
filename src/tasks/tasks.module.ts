// tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Vehicles } from '../vehicle/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicles])],
  providers: [TasksService],
})
export class TasksModule {}
