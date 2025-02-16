import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

// enum VehicleCategoryEnum {
//   Gypsy = 'Gypsy',
//   ALS = 'ALS',
//   Dozer = 'Dozer',
//   '2-s ton' = '2-s ton',
//   Plant = 'Plant',
//   Misc = 'Misc',
// }

@Entity()
export class VehicleRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  Gypsy: number;

  @Column({ type: 'integer' })
  ALS: number;

  @Column({ type: 'integer' })
  Dozer: number;

  @Column({ type: 'integer' })
  two_s_ton: number;

  @Column({ type: 'integer' })
  Plant: number;

  @Column({ type: 'integer' })
  Misc: number;

  @Column({ type: 'text', default: 'open' })
  status: 'open' | 'closed';

  @Column({ type: 'boolean', nullable: true })
  is_approved: boolean;

  @Column({ type: 'text', nullable: false })
  comments: string;

  @Column({ type: 'text', nullable: false })
  email_of_user: string;

  @Column({ type: 'timestamp', nullable: false })
  requested_date: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
