import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { getVehicleResponseDto } from './dto/vehicle.response.dto';
import { AddVehicleRequestDto } from './dto/vehicle.request.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('/vehicle')
@ApiBearerAuth()
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all vehicles',
    type: getVehicleResponseDto,
  })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'currentClass', required: false, type: String })
  @ApiQuery({ name: 'sparePartRequested', required: false, type: String })
  async getAllVehicle(
    @Query('category') category?: string,
    @Query('currentClass') currentClass?: number,
    @Query('sparePartRequested') sparePartRequested?: string,
  ): Promise<getVehicleResponseDto[]> {
    return await this.vehicleService.getAllVehicles(
      category,
      currentClass,
      sparePartRequested,
    );
  }

  @Post('add')
  @ApiBody({ type: AddVehicleRequestDto })
  @ApiResponse({
    type: getVehicleResponseDto,
    status: 201,
    description: 'success',
  })
  async addVehicle(
    @Body() vehicleData: AddVehicleRequestDto,
  ): Promise<getVehicleResponseDto> {
    return await this.vehicleService.addVehicle(vehicleData);
  }
}
