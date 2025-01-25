import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Vehicles } from './vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleAssignment } from './vehicleToDriverAssignment.entitty';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicles, VehicleAssignment]), // Import and provide the AuthEntity to TypeOrmModule
    ScheduleModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService], // Remove AuthEntity from providers
})
export class VehicleModule {}
