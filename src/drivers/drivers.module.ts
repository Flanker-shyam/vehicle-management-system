import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminAuthMiddleware } from 'src/middlewares/admin-auth.middleware';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { Drivers } from './drivers.entity';
import { VehicleAssignment } from 'src/vehicleAssignment/vehicleToDriverAssignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drivers, VehicleAssignment])],
  controllers: [DriversController],
  providers: [DriversService, JwtService],
})
export class DriversModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(AdminAuthMiddleware).forRoutes(DriversController);
  }
}
