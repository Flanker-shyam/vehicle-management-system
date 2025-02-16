import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class VehicleRequest {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the vehicle request',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 5,
    description: 'Number of Gypsy vehicles requested',
  })
  @Column({ type: 'integer' })
  Gypsy: number;

  @ApiProperty({ example: 3, description: 'Number of ALS vehicles requested' })
  @Column({ type: 'integer' })
  ALS: number;

  @ApiProperty({
    example: 2,
    description: 'Number of Dozer vehicles requested',
  })
  @Column({ type: 'integer' })
  Dozer: number;

  @ApiProperty({
    example: 4,
    description: 'Number of 2.5 ton vehicles requested',
  })
  @Column({ type: 'integer' })
  two_s_ton: number;

  @ApiProperty({
    example: 1,
    description: 'Number of Plant vehicles requested',
  })
  @Column({ type: 'integer' })
  Plant: number;

  @ApiProperty({
    example: 6,
    description: 'Number of Miscellaneous vehicles requested',
  })
  @Column({ type: 'integer' })
  Misc: number;

  @ApiProperty({
    example: 'open',
    description: 'Status of the vehicle request',
    enum: ['open', 'closed'],
  })
  @Column({ type: 'text', default: 'open' })
  status: 'open' | 'closed';

  @ApiProperty({
    example: true,
    description: 'Approval status of the vehicle request',
    nullable: true,
  })
  @Column({ type: 'boolean', nullable: true })
  is_approved: boolean;

  @ApiProperty({
    example: 'Need vehicles for event',
    description: 'Comments regarding the vehicle request',
  })
  @Column({ type: 'text', nullable: false })
  comments: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user who requested the vehicles',
  })
  @Column({ type: 'text', nullable: false })
  email_of_user: string;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Date when the vehicle request was made',
  })
  @Column({ type: 'timestamp', nullable: false })
  requested_date: Date;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Date when the vehicle request was created',
  })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Date when the vehicle request was last updated',
  })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
