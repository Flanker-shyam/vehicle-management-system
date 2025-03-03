import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VehicleAssignment } from '../vehicleAssignment/vehicleToDriverAssignment.entity';

@Entity()
export class Vehicles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  vehicle_number: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'float' })
  ododmeter_reading: number;

  @Column({ type: 'text', nullable: true })
  assigned_driver: string | null;

  @Column({ type: 'text' })
  current_class: number;

  @Column({ type: 'timestamp' })
  class_due_date: Date;

  @Column({ type: 'boolean' })
  pending_maintainence: boolean;

  @Column('text', { array: true })
  spare_part_requested: string[];

  @Column({ type: 'text' })
  comments: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => VehicleAssignment, (assignment) => assignment.vehicle)
  @Exclude()
  assignments: VehicleAssignment[];
}
