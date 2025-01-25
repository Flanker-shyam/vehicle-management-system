import { Vehicles } from '../vehicle/vehicle.entity';
import { Drivers } from '../drivers/drivers.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity()
export class VehicleAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Drivers, (driver) => driver.assignments)
  @JoinColumn({ name: 'driver_id' })
  driver: Drivers;

  @ManyToOne(() => Vehicles, (vehicle) => vehicle.assignments)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicles;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assignmentDate: Date;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
