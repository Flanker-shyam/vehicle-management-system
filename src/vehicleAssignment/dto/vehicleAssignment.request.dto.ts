import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleAssignmentRequestDto {
  @ApiProperty({
    description: 'vehicle number',
    example: 'HW-123',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  vehicleNumber: string;

  @ApiProperty({
    description: 'service number of driver',
    example: 1,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  driverServiceNumber: string;

  @ApiProperty({
    description: 'Status of the assignment',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}

export class UpdateAssignmentRequestDto {
  @ApiProperty({
    description: 'vehicle number',
    example: 'HW-123',
    type: String,
  })
  @IsString()
  @IsOptional()
  vehicleNumber?: string;

  @ApiProperty({
    description: 'service number of driver',
    example: 1,
    type: String,
  })
  @IsString()
  @IsOptional()
  driverServiceNumber?: string;

  @ApiProperty({
    description: 'Status of the assignment',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
