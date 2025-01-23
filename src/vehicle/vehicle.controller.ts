import { Controller, Get, Post, Body } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { getVehicleResponseDto } from './dto/vehicle.response.dto';
import { AddVehicleRequestDto } from './dto/vehicle.request.dto';

@Controller('url')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async getAllVehicle(): Promise<getVehicleResponseDto[]> {
    return await this.getAllVehicle();
  }

  @Post()
  async addVehicle(@Body() vehicleData: AddVehicleRequestDto) {
    return await this.vehicleService.addVehicle(vehicleData);
  }
}
