import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { DriversEntity } from '../drivers/drivers.entity';
import { VehicleEntity } from '../vehicle/vehicle.entity';
import { DriverVehicleAssignmentEntity } from '../vehicle/vehicleToDriverAssignment.entitty';

dotenv.config();

const config = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [VehicleEntity, DriversEntity, DriverVehicleAssignmentEntity],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
