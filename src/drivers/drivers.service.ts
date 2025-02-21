import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drivers } from './drivers.entity';
import { DriversResponseDto } from './dto/drivers.response.dto';
import {
  DriversRequestDto,
  UpdateDriversRequestDto,
} from './dto/drivers.request.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Drivers)
    private driversRepository: Repository<Drivers>,
  ) {}

  async getAllDrivers(
    company?: string,
    assigned?: string,
  ): Promise<DriversResponseDto[]> {
    try {
      console.log(company, assigned);
      const query = this.driversRepository.createQueryBuilder('drivers');

      if (company) {
        query.andWhere('drivers.unit = :unit', { unit: company });
      }

      if (assigned) {
        if (assigned === 'unassigned') {
          query.andWhere('drivers.assigned_vehicle IS NULL');
        } else if (assigned === 'assigned') {
          query.andWhere('drivers.assigned_vehicle IS NOT NULL');
        }
      }

      const drivers = await query.getMany();
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

  async updateDriver(
    id: number,
    updateBody: UpdateDriversRequestDto,
  ): Promise<DriversResponseDto> {
    try {
      const driver = await this.driversRepository.findOne({ where: { id } });
      if (!driver) {
        throw new NotFoundException(`Driver not found`);
      }

      driver.rank = updateBody.rank ?? driver.rank;
      driver.first_name = updateBody.first_name ?? driver.first_name;
      driver.last_name = updateBody.last_name ?? driver.last_name;
      driver.email = updateBody.email ?? driver.email;
      driver.phone_number = updateBody.phone_number ?? driver.phone_number;
      driver.unit = updateBody.unit ?? driver.unit;

      await this.driversRepository.save(driver);
      return driver;
    } catch (err) {
      console.log('Error occured while updating driver', err);
      throw err;
    }
  }
}
