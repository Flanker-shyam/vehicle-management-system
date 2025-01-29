import { ApiProperty } from '@nestjs/swagger';

export class DriversResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the driver',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The service number of the driver',
    type: String,
    example: 'SN12345',
  })
  service_number: string;

  @ApiProperty({
    description: 'The rank of the driver',
    type: String,
    example: 'Sergeant',
  })
  rank: string;

  @ApiProperty({
    description: 'The first name of the driver',
    type: String,
    example: 'John',
  })
  first_name: string;

  @ApiProperty({
    description: 'The last name of the driver',
    type: String,
    example: 'Doe',
  })
  last_name: string;

  @ApiProperty({
    description: 'The email address of the driver',
    type: String,
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the driver',
    type: String,
    example: '9090909090',
  })
  phone_number: string;

  @ApiProperty({
    description: 'The unit of the driver',
    type: String,
    example: 'Logistics',
  })
  unit: string;

  @ApiProperty({
    description: 'The date when the driver was created',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Assigned vehicle Number(if any)',
    type: String,
    example: 'HX-123',
  })
  assigned_vehicle: string;

  @ApiProperty({
    description: 'The date when the driver was last updated',
    type: Date,
    example: '2023-01-02T00:00:00Z',
  })
  updated_at: Date;
}
