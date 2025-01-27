import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
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
import { AdminAuthMiddleware } from 'src/middlewares/admin-auth.middleware';
import { UserAuthMiddleware } from 'src/middlewares/user-auth.middleware';

@ApiTags('/vehicle')
@ApiBearerAuth()
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @UseGuards(AdminAuthMiddleware)
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

  @UseGuards(AdminAuthMiddleware)
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

  @UseGuards(UserAuthMiddleware)
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
}
