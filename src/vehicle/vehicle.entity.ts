import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VehicleAssignment } from './vehicleToDriverAssignment.entitty';

@Entity()
export class Vehicles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  vehicleNumber: string;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'float' })
  ododmeterReading: number;

  @Column({ type: 'text', nullable: true })
  assignedDriver: string | null;

  @Column({ type: 'text' })
  currentClass: number;

  @Column({ type: 'timestamp' })
  classDueDate: Date;

  @Column({ type: 'boolean' })
  pendingMaintainence: boolean;

  @Column({ type: 'text' })
  sparePartRequested: string;

  @Column({ type: 'text' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => VehicleAssignment, (assignment) => assignment.vehicle)
  @Exclude()
  assignments: VehicleAssignment[];
}
