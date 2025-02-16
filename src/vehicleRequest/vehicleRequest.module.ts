import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VehicleRequestController } from './vehicleRequest.controller';
import { VehicleRequestService } from './vehicleRequest.service';
import { VehicleRequest } from './vehicleRequest.entity';
import { MailerService } from '../mailer/mailer.service';
import { Vehicles } from 'src/vehicle/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleRequest, Vehicles]),
    ScheduleModule,
  ],
  controllers: [VehicleRequestController],
  providers: [VehicleRequestService, MailerService, JwtService],
})
export class VehicleRequestModule {}
