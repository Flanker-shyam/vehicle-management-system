import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { VehicleAssignmentService } from './vehicleAssignment.service';
import { VehicleAssignmentRequestDto } from './dto/vehicleAssignment.request.dto';

@Injectable()
@Controller('vehicleAssignment')
export class VehicleAssignmentController {
  constructor(
    private readonly vehicleAssignmentService: VehicleAssignmentService,
  ) {}

  @Get()
  async getAllAssignments() {
    return await this.vehicleAssignmentService.getAllAssignments();
  }

  @Post()
  async assignVehicleToDriver(
    @Body() vehicleAssignmentData: VehicleAssignmentRequestDto,
  ): Promise<number> {
    return await this.vehicleAssignmentService.assignVehicleToDriver(
      vehicleAssignmentData,
    );
  }
}
