import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VehicleAssignmentService } from './vehicleAssignment.service';
import { VehicleAssignmentRequestDto } from './dto/vehicleAssignment.request.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleAssignmentResponseDto } from './dto/vehicleAssignment.response.dto';
import { VehicleService } from '../vehicle/vehicle.service';
import { DriversService } from '../drivers/drivers.service';
import { Vehicles } from '../vehicle/vehicle.entity';
import { Drivers } from '../drivers/drivers.entity';

@Injectable()
@ApiTags('/vehicleAssignment')
@ApiBearerAuth()
@Controller('vehicleAssignment')
export class VehicleAssignmentController {
  constructor(
    private readonly vehicleAssignmentService: VehicleAssignmentService,
    private readonly vehiclesService: VehicleService,
    private readonly driversService: DriversService,
  ) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [VehicleAssignmentResponseDto],
  })
  async getAllAssignments(): Promise<VehicleAssignmentResponseDto[]> {
    return await this.vehicleAssignmentService.getAllAssignments();
  }

  @Get('/get-vehicles-drivers')
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  async getAllVehiclesAndDrivers(): Promise<{
    drivers: string[];
    vehicles: string[];
  }> {
    try {
      const vehicles = await this.vehiclesService.getAllVehicles();
      const drivers = await this.driversService.getAllDrivers();

      if (!vehicles || !drivers) {
        throw new Error('Error fetching Vehicles or drivers');
      }

      const driversList = drivers
        .filter((driver: Drivers) => driver.assigned_vehicle === null)
        .map((driver: Drivers) => driver.service_number);

      const vehicleList = vehicles
        .filter((vehicle: Vehicles) => vehicle.assigned_driver === null)
        .map((vehicle: Vehicles) => vehicle.vehicle_number);

      return { drivers: driversList, vehicles: vehicleList };
    } catch (err) {
      throw err;
    }
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'success',
    type: VehicleAssignmentResponseDto,
  })
  async getAssignmentById(
    @Param('id') id: string,
  ): Promise<VehicleAssignmentResponseDto> {
    try {
      return await this.vehicleAssignmentService.getAssignmentById(Number(id));
    } catch (err) {
      throw err;
    }
  }

  @Post('assign')
  @ApiResponse({
    status: 201,
    description: 'assigned Success',
    type: VehicleAssignmentResponseDto,
  })
  @ApiBody({
    type: VehicleAssignmentRequestDto,
  })
  async assignVehicleToDriver(
    @Body() vehicleAssignmentData: VehicleAssignmentRequestDto,
  ): Promise<number> {
    return await this.vehicleAssignmentService.assignVehicleToDriver(
      vehicleAssignmentData,
    );
  }

  @Patch('unassign/:id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Number,
  })
  async unAssignVehicle(@Param('id') id: string): Promise<number> {
    return await this.vehicleAssignmentService.submitVehicle(Number(id));
  }
}
