import { ApiProperty } from '@nestjs/swagger';

export class AddVehicleRequestDto {
  @ApiProperty({
    description: 'vehicle Number',
    type: String,
    example: 'HX-123',
  })
  vehicleNumber: string;
  @ApiProperty({
    description: 'Category of vehicle',
    type: Number,
    example: 'Truck',
  })
  category: string;
  @ApiProperty({
    description: 'odometer readings of vehicle',
    type: Number,
    example: 1245,
  })
  ododmeterReading: number;
  @ApiProperty({
    description: 'Id of Driver assigned (if any)',
    type: String,
    example: '2',
  })
  assignedDriver: string | null;
  @ApiProperty({
    description: 'class of vehicle',
    type: Number,
    example: 1,
    required: false,
  })
  currentClass: number;
  @ApiProperty({
    description: 'Due date for service',
    type: Date,
    example: '2024-02-03 00:00:00.000',
  })
  classDueDate: Date;
  @ApiProperty({
    description: 'if pending maintainance',
    type: Boolean,
    example: false,
  })
  pendingMaintainence: boolean;
  @ApiProperty({
    description: 'spare parts requested',
    type: Array,
    example: ['oil'],
  })
  sparePartRequested: string[];
  @ApiProperty({
    description: 'Comments',
    type: Array,
    example: 'string',
  })
  comments: string;
}

export class UpdateVehicleRequestDto {
  @ApiProperty({
    description: 'odometer readings of vehicle',
    type: Number,
    example: 1245,
  })
  ododmeterReading: number;

  @ApiProperty({
    description: 'Due date for service',
    type: Date,
    example: '2024-02-03 00:00:00.000',
  })
  classDueDate: Date;

  @ApiProperty({
    description: 'spare parts requested',
    type: Array,
    example: ['oil'],
  })
  sparePartRequested: string[];

  @ApiProperty({
    description: 'if pending maintainance',
    type: Boolean,
    example: false,
  })
  pendingMaintainence: boolean;

  @ApiProperty({
    description: 'Comments',
    type: Array,
    example: 'string',
  })
  comments: string;
}
