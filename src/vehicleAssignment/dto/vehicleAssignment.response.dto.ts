import { ApiProperty } from '@nestjs/swagger';

export class VehicleAssignmentResponseDto {
  @ApiProperty({
    description: 'ID of the Assignment',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({ description: 'ID of the vehicle', example: 1, type: Number })
  vehicleId: number;

  @ApiProperty({ description: 'ID of the driver', example: 1, type: Number })
  driverId: number;

  @ApiProperty({
    description: 'Status of the assignment',
    example: true,
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Date of the assignment',
    example: '2023-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  assignment_date: Date;

  @ApiProperty({
    description: 'Date when the record was created',
    example: '2023-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Date when the record was last updated',
    example: '2023-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updated_at: Date;
}
