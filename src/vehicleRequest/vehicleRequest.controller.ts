import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VehicleRequestService } from './vehicleRequest.service';
import {
  VehicleRequestDto,
  VehicleUpdateRequestDto,
} from './vehicleRequest.dto';
import { VehicleRequest } from './vehicleRequest.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
@Injectable()
export class VehicleRequestController {
  constructor(private readonly vehicleRequestService: VehicleRequestService) {}

  @Post('vehicleRequest')
  async createRequest(
    @Body() data: VehicleRequestDto,
  ): Promise<VehicleRequest> {
    try {
      return await this.vehicleRequestService.createRequest(data);
    } catch (err) {
      throw err;
    }
  }

  @Get('vehicleRequest')
  @ApiResponse({
    status: 200,
    description: 'success',
    type: [VehicleRequest],
  })
  async getAllRequests(): Promise<VehicleRequest[]> {
    try {
      return await this.vehicleRequestService.getAllRequests();
    } catch (err) {
      throw err;
    }
  }
  @ApiResponse({
    status: 200,
    description: 'success',
    example: {
      Gypsy: [1, 2, 4],
      ALS: [3],
      Dozer: [4, 5],
      '2-s ton': [1, 2, 4],
      Plant: [1, 2, 4],
      Misc: [1, 2, 4],
    },
  })
  @Get('allAvailableVehicles')
  async getAllVehiclesByCategory(): Promise<any> {
    try {
      return await this.vehicleRequestService.getAllVehiclesByCategory();
    } catch (err) {
      throw err;
    }
  }

  @Patch('updateRequestStatus/:id')
  async updateRequestStatus(
    @Body() data: VehicleUpdateRequestDto,
    @Param('id') id: number,
  ): Promise<VehicleRequest> {
    try {
      return await this.vehicleRequestService.updateRequestStatus(
        id,
        data.is_approved,
        data.comments,
      );
    } catch (err) {
      throw err;
    }
  }
}
