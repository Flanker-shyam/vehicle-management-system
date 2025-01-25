import { Controller, Get, Body, Post } from '@nestjs/common';
import { DriversDto } from './drivers.dto';
import { DriversService } from './drivers.service';

@Controller('driver')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async getAllDrivers(): Promise<DriversDto[] | any> {
    return await this.driversService.getAllDrivers();
  }

  @Post()
  async addDriver(@Body() driverData: DriversDto) {
    return await this.driversService.addDriver(driverData);
  }

  @Get(':id')
  async getDriverById(id: number): Promise<DriversDto | any> {
    return await this.driversService.getDriverById(id);
  }
}
