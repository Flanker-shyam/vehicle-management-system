import { ApiProperty } from '@nestjs/swagger';

class Vehicle {
  @ApiProperty({ description: 'ID of the vehicle', example: 1, type: Number })
  id: number;

  @ApiProperty({
    description: 'vehicle number',
    example: 'HX-123',
    type: String,
  })
  number: string;
}

class Driver {
  @ApiProperty({ description: 'ID of the driver', example: 1, type: Number })
  id: number;

  @ApiProperty({
    description: 'Driver name',
    example: 'John Doe',
    type: String,
  })
  name: string;
}

export class VehicleAssignmentResponseDto {
  @ApiProperty({
    description: 'ID of the Assignment',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'vehicle',
    example: { id: 1, number: 'HX-123' },
    type: Vehicle,
  })
  vehicle: Vehicle;

  @ApiProperty({
    description: 'driver',
    example: { id: 1, name: 'John Doe' },
    type: Driver,
  })
  driver: Driver;

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
  assignmentDate: Date;

  @ApiProperty({
    description: 'Date when the record was created',
    example: '2023-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the record was last updated',
    example: '2023-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}
