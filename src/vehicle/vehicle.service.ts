import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vehicles } from './vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddVehicleRequestDto } from './dto/vehicle.request.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicles)
    private vehicleRepository: Repository<Vehicles>,
  ) {}

  async getAllVehicles(
    category?: string,
    currentClass?: number,
    sparePartRequested?: string,
  ): Promise<Vehicles[] | any> {
    try {
      const query = this.vehicleRepository.createQueryBuilder('vehicles');

      if (category) {
        query.andWhere('vehicles.category = :category', { category });
      }

      if (currentClass) {
        query.andWhere('vehicles.current_class = :current_class', {
          currentClass,
        });
      }

      if (sparePartRequested) {
        query.andWhere(
          'vehicles.spare_part_requested = :spare_part_requested',
          {
            sparePartRequested,
          },
        );
      }

      const vehicles = await query.getMany();
      return vehicles;
    } catch (err) {
      console.log('Error occurred while fetching all vehicles', err);
      throw new InternalServerErrorException(
        `Internal server error: ${err.message}`,
      );
    }
  }
  async addVehicle(vehicleData: AddVehicleRequestDto) {
    const vehicle = new Vehicles();
    vehicle.vehicle_number = vehicleData.vehicleNumber;
    vehicle.category = vehicleData.category;
    vehicle.status = vehicleData.status;
    vehicle.class_due_date = vehicleData.classDueDate;
    vehicle.current_class = vehicleData.currentClass;
    vehicle.ododmeter_reading = vehicleData.ododmeterReading;
    vehicle.pending_maintainence = vehicleData.pendingMaintainence;
    vehicle.spare_part_requested = vehicleData.sparePartRequested;
    try {
      await this.vehicleRepository.save(vehicle);
      return vehicle;
    } catch (err) {
      console.log('Error occured while adding vehicle', err);
      throw new InternalServerErrorException(
        `Internal server error: ${err.message}`,
      );
    }
  }

  async updateVehicleDetails() {}
}

//spare part request
// odometer
