import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriversEntity } from './drivers.entity';
import { DriversDto } from './drivers.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(DriversEntity)
    private driversRepository: Repository<DriversEntity>,
  ) {}

  async getAllDrivers(): Promise<DriversEntity[] | any> {
    try {
      const drivers = await this.driversRepository.find();
      return drivers;
    } catch (err) {
      console.log('Error occured while fetching all drivers', err);
      throw err;
    }
  }

  async addDriver(driverData: DriversDto) {
    const driverEntity = new DriversEntity();
    driverEntity.service_number = driverData.service_number;
    driverEntity.rank = driverData.rank;
    driverEntity.first_name = driverData.first_name;
    driverEntity.last_name = driverData.last_name;
    driverEntity.email = driverData.email;
    driverEntity.phone_number = driverData.phone_number;
    driverEntity.unit = driverData.unit;
    try {
      await this.driversRepository.save(driverEntity);
      return driverEntity;
    } catch (err) {
      console.log('Error occured while adding driver', err);
      throw err;
    }
  }
}
