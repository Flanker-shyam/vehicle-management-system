import { Exclude } from 'class-transformer';
import { VehicleAssignment } from '../vehicleAssignment/vehicleToDriverAssignment.entitty';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Drivers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  service_number: string;

  @Column({ type: 'text' })
  rank: string;

  @Column({ type: 'text' })
  first_name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  phone_number: string;

  @Column({ type: 'text' })
  unit: string;

  @Column({ type: 'integer', nullable: true })
  assigned_vehicle: number | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => VehicleAssignment, (assignment) => assignment.driver)
  @Exclude()
  assignments: VehicleAssignment[];
}
