import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class VehicleAssignmentRequestDto {
  @IsNumber()
  @IsNotEmpty()
  vehicleId: string;

  @IsNumber()
  @IsNotEmpty()
  driverId: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
