import { ApiProperty } from '@nestjs/swagger';

export class getVehicleResponseDto {
  @ApiProperty({
    description: 'id of vehicle',
    type: Number,
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'vehicle Number',
    type: String,
    example: 'HX-123',
  })
  vehicle_number: string;
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
  ododmeter_reading: number;
  @ApiProperty({
    description: 'Id of Driver assigned (if any)',
    type: String,
    example: '2',
  })
  assigned_driver: number | null;
  @ApiProperty({
    description: 'class of vehicle',
    type: Number,
    example: 1,
  })
  current_class: number;
  @ApiProperty({
    description: 'Due date for service',
    type: Date,
    example: '2024-02-03 00:00:00.000',
  })
  class_due_date: Date;
  @ApiProperty({
    description: 'if pending maintainance',
    type: Boolean,
    example: false,
  })
  pending_maintainence: boolean;
  @ApiProperty({
    description: 'spare parts requested',
    type: Array,
    example: ['oil'],
  })
  spare_part_requested: string[];
  @ApiProperty({
    description: 'Comments',
    type: String,
    example: 'string',
  })
  comments: string;
  @ApiProperty({
    description: 'created date',
    type: Date,
    example: '2024-02-03 00:00:00.000',
  })
  created_at: Date;
  @ApiProperty({
    description: 'updated date',
    type: Date,
    example: '2024-02-03 00:00:00.000',
  })
  updated_at: Date;
}

export class UpdateVehicleResponseDto {
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
  pending_maintainence: boolean;

  @ApiProperty({
    description: 'Comments',
    type: Array,
    example: 'string',
  })
  comments: string;
}
