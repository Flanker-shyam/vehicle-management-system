import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DriverVehicleAssignmentEntity } from './vehicleToDriverAssignment.entitty';

@Entity()
export class VehicleEntity {
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

  @OneToMany(
    () => DriverVehicleAssignmentEntity,
    (assignment) => assignment.vehicle,
  )
  assignments: DriverVehicleAssignmentEntity[];
}
