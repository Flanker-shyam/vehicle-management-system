import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Drivers } from '../drivers/drivers.entity';
import { Vehicles } from '../vehicle/vehicle.entity';
import { VehicleAssignment } from '../vehicleAssignment/vehicleToDriverAssignment.entitty';
import { Auth } from '../auth/auth.entity';
import { VehicleRequest } from '../vehicleRequest/vehicleRequest.entity';

dotenv.config();

const config = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Vehicles, Drivers, VehicleAssignment, Auth, VehicleRequest],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
