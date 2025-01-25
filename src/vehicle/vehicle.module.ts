import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Vehicles } from './vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleAssignment } from '../vehicleAssignment/vehicleToDriverAssignment.entitty';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicles, VehicleAssignment]), // Import and provide the AuthEntity to TypeOrmModule
    ScheduleModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService, JwtService], // Remove AuthEntity from providers
})
export class VehicleModule {
  configure(consume: MiddlewareConsumer) {
    consume.apply(AuthMiddleware).forRoutes(VehicleController);
  }
}
