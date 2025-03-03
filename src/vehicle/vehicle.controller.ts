import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { getVehicleResponseDto } from './dto/vehicle.response.dto';
import {
  AddVehicleRequestDto,
  UpdateVehicleRequestDto,
} from './dto/vehicle.request.dto';
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
  @ApiQuery({ name: 'assigned', required: false, type: String })
  async getAllVehicle(
    @Query('category') category?: string,
    @Query('currentClass') currentClass?: number,
    @Query('sparePartRequested') sparePartRequested?: string,
    @Query('assigned') assigned?: string,
  ): Promise<getVehicleResponseDto[]> {
    return await this.vehicleService.getAllVehicles(
      category,
      currentClass,
      sparePartRequested,
      assigned,
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

  @Patch('update/:id')
  @ApiBody({ type: UpdateVehicleRequestDto })
  @ApiResponse({
    type: getVehicleResponseDto,
    description: 'success',
    status: 200,
  })
  async updateVehicle(
    @Param('id') id: string,
    @Body() updateDetails: UpdateVehicleRequestDto,
  ): Promise<getVehicleResponseDto> {
    try {
      return await this.vehicleService.updateVehicleDetails(
        Number(id),
        updateDetails,
      );
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'a vehicles',
    type: getVehicleResponseDto,
  })
  async getVehicleById(
    @Param('id') id: string,
  ): Promise<getVehicleResponseDto> {
    try {
      return await this.vehicleService.getVehicleById(Number(id));
    } catch (err) {
      throw err;
    }
  }
}
