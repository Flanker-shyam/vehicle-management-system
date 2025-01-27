import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drivers } from '../drivers/drivers.entity';
import { DriversRequestDto } from '../drivers/dto/drivers.request.dto';

@Injectable()
export class DriverSeedService {
  constructor(
    @InjectRepository(Drivers)
    private readonly driverRepository: Repository<Drivers>,
  ) {}

  async insertDrivers() {
    console.log('Seeding Drivers Tables...');
    const drivers: DriversRequestDto[] = [
      {
        service_number: '12121',
        rank: 'Jco',
        first_name: 'Ram',
        last_name: 'Doe',
        email: 'ram.doe@example.com',
        phone_number: '9090909090',
        unit: 'Logistics',
      },
      {
        service_number: '123456',
        rank: 'Captain',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '9090909090',
        unit: 'Logistics',
      },
      {
        service_number: '98989',
        rank: 'Captain',
        first_name: 'Vikas',
        last_name: 'Sharma',
        email: 'vikas.sharma@example.com',
        phone_number: '9090909090',
        unit: 'Infantry',
      },
      {
        service_number: '89898',
        rank: 'Lance Naik',
        first_name: 'John',
        last_name: 'verma',
        email: 'john.verma@example.com',
        phone_number: '9090909090',
        unit: 'Logistics',
      },
      {
        service_number: '8888777',
        rank: 'Lieutienent',
        first_name: 'Madhav',
        last_name: 'Kumar',
        email: 'madhav.doe@example.com',
        phone_number: '9090909090',
        unit: 'Logistics',
      },
    ];

    for (const item of drivers) {
      const driver = new Drivers();
      driver.service_number = item.service_number;
      driver.rank = item.rank;
      driver.first_name = item.first_name;
      driver.last_name = item.last_name;
      driver.email = item.email;
      driver.phone_number = item.phone_number;
      driver.unit = item.unit;
      await this.driverRepository.save(driver);
    }
  }
}
