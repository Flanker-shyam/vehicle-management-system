import { VehicleEntity } from '../vehicle/vehicle.entity';
import { DriversEntity } from '../drivers/drivers.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity()
export class DriverVehicleAssignmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => DriversEntity, (driver) => driver.assignments)
  @JoinColumn({ name: 'driver_id' })
  driver: DriversEntity;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.assignments)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: VehicleEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assignmentDate: Date;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
