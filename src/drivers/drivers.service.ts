import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drivers } from './drivers.entity';
import { DriversResponseDto } from './dto/drivers.response.dto';
import { DriversRequestDto } from './dto/drivers.request.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Drivers)
    private driversRepository: Repository<Drivers>,
  ) {}

  async getAllDrivers(): Promise<DriversResponseDto[]> {
    try {
      const drivers = await this.driversRepository.find();
      return drivers;
    } catch (err) {
      console.log('Error occured while fetching all drivers', err);
      throw new InternalServerErrorException(
        `Internal server error: ${err.message}`,
      );
    }
  }

  async addDriver(driverData: DriversRequestDto): Promise<DriversResponseDto> {
    const driver = new Drivers();
    driver.service_number = driverData.service_number;
    driver.rank = driverData.rank;
    driver.first_name = driverData.first_name;
    driver.last_name = driverData.last_name;
    driver.email = driverData.email;
    driver.phone_number = driverData.phone_number;
    driver.unit = driverData.unit;
    try {
      await this.driversRepository.save(driver);
      return driver;
    } catch (err) {
      console.log('Error occured while adding driver', err);
      throw new InternalServerErrorException(
        `Internal server error: ${err.message}`,
      );
    }
  }

  async getDriverById(id: number): Promise<DriversResponseDto> {
    try {
      const driver = await this.driversRepository.findOne({ where: { id } });
      if (!driver) {
        throw new NotFoundException(`Driver not found`);
      }
      return driver;
    } catch (err) {
      console.log('Error occured while fetching driver by id', err);
      throw err;
    }
  }
}
