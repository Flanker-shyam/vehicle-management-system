import { Vehicles } from '../vehicle/vehicle.entity';
import { Drivers } from '../drivers/drivers.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  JoinColumn,
  UpdateDateColumn,
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
  assignment_date: Date;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
