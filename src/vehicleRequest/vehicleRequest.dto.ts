import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VehicleRequestDto {
  @ApiProperty({
    description: 'Gypsy',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  Gypsy: number;

  @ApiProperty({
    description: 'ALS',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  ALS: number;

  @ApiProperty({
    description: 'Dozer',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  Dozer: number;

  @ApiProperty({
    description: '2-s ton',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  '2-s ton': number;

  @ApiProperty({
    description: 'Plant',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  Plant: number;

  @ApiProperty({
    description: 'Misc',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  Misc: number;

  @ApiProperty({
    description: 'request date',
    example: '2021-09-01',
    type: Date,
  })
  requestedDate: Date;

  @ApiProperty({
    description: 'comments',
    example: 'comments',
    type: String,
  })
  @IsNotEmpty()
  comments: string;

  @ApiProperty({
    description: 'email of user',
    example: 'example@gmail.com',
    type: String,
  })
  email_of_user: string;
}

export class VehicleUpdateRequestDto {
  @ApiProperty({
    description: 'is approved',
    example: true,
    type: Boolean,
  })
  @IsNotEmpty()
  is_approved: boolean;

  @ApiProperty({
    description: 'comments',
    example: 'Approved with 5 vehicles',
    type: String,
  })
  @IsNotEmpty()
  comments: string;
}
