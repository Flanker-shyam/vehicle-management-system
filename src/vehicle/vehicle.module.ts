import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Vehicles } from './vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { VehicleAssignment } from '../vehicleAssignment/vehicleToDriverAssignment.entity';
import { JwtService } from '@nestjs/jwt';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AdminAuthMiddleware } from '../middlewares/admin-auth.middleware';
import { UserAuthMiddleware } from 'src/middlewares/user-auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicles, VehicleAssignment]), // Import and provide the AuthEntity to TypeOrmModule
    ScheduleModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService, JwtService], // Remove AuthEntity from providers
})
export class VehicleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthMiddleware).forRoutes(
      { path: '/vehicle', method: RequestMethod.ALL }, // Apply to all routes under /vehicle
      { path: '/vehicle/add', method: RequestMethod.ALL },
      { path: '/vehicle/:id', method: RequestMethod.ALL }, // Apply to all routes under /vehicle/:id
    );
    consumer
      .apply(UserAuthMiddleware)
      .forRoutes({ path: '/vehicle/update/:id', method: RequestMethod.PATCH });
  }
}
