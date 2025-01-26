import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleAssignmentRequestDto {
  @ApiProperty({ description: 'ID of the vehicle', example: 1, type: Number })
  @IsNumber()
  @IsNotEmpty()
  vehicleId: number;

  @ApiProperty({ description: 'ID of the driver', example: 1, type: Number })
  @IsNumber()
  @IsNotEmpty()
  driverId: number;

  @ApiProperty({
    description: 'Status of the assignment',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
