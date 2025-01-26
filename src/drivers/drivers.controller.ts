import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { DriversResponseDto } from './dto/drivers.response.dto';
import { DriversService } from './drivers.service';
import { DriversRequestDto } from './dto/drivers.request.dto';

@Controller('driver')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async getAllDrivers(): Promise<DriversResponseDto[] | any> {
    return await this.driversService.getAllDrivers();
  }

  @Post()
  async addDriver(@Body() driverData: DriversRequestDto) {
    return await this.driversService.addDriver(driverData);
  }

  @Get(':id')
  async getDriverById(@Param('id') id: number): Promise<DriversResponseDto> {
    return await this.driversService.getDriverById(id);
  }
}
