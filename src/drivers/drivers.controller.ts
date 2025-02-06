import { Controller, Get, Body, Post, Param, Patch } from '@nestjs/common';
import { DriversResponseDto } from './dto/drivers.response.dto';
import { DriversService } from './drivers.service';
import {
  DriversRequestDto,
  UpdateDriversRequestDto,
} from './dto/drivers.request.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('/driver')
@ApiBearerAuth()
@Controller('driver')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all drivers',
    type: [DriversResponseDto],
  })
  async getAllDrivers(): Promise<DriversResponseDto[]> {
    return await this.driversService.getAllDrivers();
  }

  @Post('add')
  @ApiBody({ type: DriversRequestDto })
  @ApiResponse({
    status: 201,
    description: 'success',
    type: DriversResponseDto,
  })
  async addDriver(
    @Body() driverData: DriversRequestDto,
  ): Promise<DriversResponseDto> {
    return await this.driversService.addDriver(driverData);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'details of a driver',
    type: DriversResponseDto,
  })
  async getDriverById(@Param('id') id: number): Promise<DriversResponseDto> {
    return await this.driversService.getDriverById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'details of a driver',
    type: DriversResponseDto,
  })
  @ApiBody({ type: UpdateDriversRequestDto })
  async updateDriver(
    @Param('id') id: number,
    @Body() updateBody: UpdateDriversRequestDto,
  ): Promise<DriversResponseDto> {
    try {
      return await this.driversService.updateDriver(Number(id), updateBody);
    } catch (err) {
      throw err;
    }
  }
}
