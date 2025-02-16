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
  async getAllRequests(): Promise<VehicleRequest[]> {
    try {
      return await this.vehicleRequestService.getAllRequests();
    } catch (err) {
      throw err;
    }
  }

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
