import { ApiProperty } from '@nestjs/swagger';

export class DriversRequestDto {
  @ApiProperty({
    description: 'Service number of the driver',
    example: '123456',
    type: String,
  })
  service_number: string;

  @ApiProperty({
    description: 'Rank of the driver',
    example: 'Captain',
    type: String,
  })
  rank: string;

  @ApiProperty({
    description: 'First name of the driver',
    example: 'John',
    type: String,
  })
  first_name: string;

  @ApiProperty({
    description: 'Last name of the driver',
    example: 'Doe',
    type: String,
  })
  last_name: string;

  @ApiProperty({
    description: 'Email address of the driver',
    example: 'john.doe@example.com',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the driver',
    example: '9090909090',
    type: String,
  })
  phone_number: string;

  @ApiProperty({
    description: 'Unit of the driver',
    example: 'Logistics',
    type: String,
  })
  unit: string;
}
