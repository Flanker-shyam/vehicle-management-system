import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/auth/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { DriversEntity } from './drivers.entity';
import { DriverVehicleAssignmentEntity } from 'src/vehicle/vehicleToDriverAssignment.entitty';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthEntity,
      DriversEntity,
      DriverVehicleAssignmentEntity,
    ]),
  ],
  controllers: [DriversController],
  providers: [DriversService, JwtService],
})
export class DriversModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(AuthMiddleware).forRoutes(DriversController);
  }
}
