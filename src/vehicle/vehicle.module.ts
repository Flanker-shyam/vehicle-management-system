import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthEntity } from 'src/auth/auth.entity';
import { VehicleEntity } from './vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { DriverVehicleAssignmentEntity } from './vehicleToDriverAssignment.entitty';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleEntity,
      AuthEntity,
      DriverVehicleAssignmentEntity,
    ]), // Import and provide the AuthEntity to TypeOrmModule
    ScheduleModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService], // Remove AuthEntity from providers
})
export class VehicleModule {}
