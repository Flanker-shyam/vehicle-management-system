import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicles } from '../vehicle/vehicle.entity';
import { VehicleSeedService } from './vehicle.seed.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../config/typeorm';
import { Drivers } from '../drivers/drivers.entity';
import { DriverSeedService } from './driver.seed.service';
import { VehicleAssignment } from '../vehicleAssignment/vehicleToDriverAssignment.entitty';
import { AssignmentSeedService } from './assignment.seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    TypeOrmModule.forFeature([Vehicles, Drivers, VehicleAssignment]),
  ],
  providers: [VehicleSeedService, DriverSeedService, AssignmentSeedService],
})
export class SeedModule {}
