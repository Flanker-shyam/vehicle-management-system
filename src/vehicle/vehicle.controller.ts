import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { getVehicleResponseDto } from './dto/vehicle.response.dto';
import { AddVehicleRequestDto } from './dto/vehicle.request.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async getAllVehicle(
    @Query('category') category: string,
    @Query('currentClass') currentClass: number,
    @Query('sparePartRequested') sparePartRequested: string,
  ): Promise<getVehicleResponseDto[]> {
    return await this.vehicleService.getAllVehicles(
      category,
      currentClass,
      sparePartRequested,
    );
  }

  @Post()
  async addVehicle(@Body() vehicleData: AddVehicleRequestDto) {
    return await this.vehicleService.addVehicle(vehicleData);
  }
}
