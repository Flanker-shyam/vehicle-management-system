import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { VehicleAssignmentController } from './vehicleAssignment.controller';
import { VehicleAssignment } from './vehicleToDriverAssignment.entitty';
import { Vehicles } from '../vehicle/vehicle.entity';
import { Drivers } from '../drivers/drivers.entity';
import { VehicleAssignmentService } from './vehicleAssignment.service';
import { AdminAuthMiddleware } from 'src/middlewares/admin-auth.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleAssignment, Vehicles, Drivers]),
    ScheduleModule,
  ],
  controllers: [VehicleAssignmentController],
  providers: [VehicleAssignmentService, JwtService],
})
export class VehicleAssignmentModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(AdminAuthMiddleware).forRoutes(VehicleAssignmentController);
  }
}
