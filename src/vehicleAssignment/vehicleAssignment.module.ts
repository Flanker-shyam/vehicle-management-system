import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VehicleAssignmentController } from './vehicleAssignment.controller';
import { VehicleAssignment } from './vehicleToDriverAssignment.entity';
import { Vehicles } from '../vehicle/vehicle.entity';
import { Drivers } from '../drivers/drivers.entity';
import { VehicleAssignmentService } from './vehicleAssignment.service';
import { AdminAuthMiddleware } from 'src/middlewares/admin-auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { VehicleService } from '../vehicle/vehicle.service';
import { DriversService } from '../drivers/drivers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleAssignment, Vehicles, Drivers]),
    ScheduleModule,
  ],
  controllers: [VehicleAssignmentController],
  providers: [
    VehicleAssignmentService,
    JwtService,
    VehicleService,
    DriversService,
  ],
})
export class VehicleAssignmentModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(AdminAuthMiddleware).forRoutes(VehicleAssignmentController);
  }
}
