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

@Injectable()
@ApiTags('/vehicleAssignment')
@ApiBearerAuth()
@Controller('vehicleAssignment')
export class VehicleAssignmentController {
  constructor(
    private readonly vehicleAssignmentService: VehicleAssignmentService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [VehicleAssignmentResponseDto],
  })
  async getAllAssignments(): Promise<VehicleAssignmentResponseDto[]> {
    return await this.vehicleAssignmentService.getAllAssignments();
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
