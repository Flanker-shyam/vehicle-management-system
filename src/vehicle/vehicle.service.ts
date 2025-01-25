import { Injectable } from '@nestjs/common';
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
      const query = this.vehicleRepository.createQueryBuilder('vehicle');

      if (category) {
        query.andWhere('vehicle.category = :category', { category });
      }

      if (currentClass) {
        query.andWhere('vehicle.currentClas = :currentClas', { currentClass });
      }

      if (sparePartRequested) {
        query.andWhere('vehicle.sparePartRequested = :sparePartRequested', {
          sparePartRequested,
        });
      }

      const vehicles = await query.getMany();
      return vehicles;
    } catch (err) {
      console.log('Error occurred while fetching all vehicles', err);
      throw err;
    }
  }
  async addVehicle(vehicleData: AddVehicleRequestDto) {
    const vehicle = new Vehicles();
    vehicle.vehicleNumber = vehicleData.vehicleNumber;
    vehicle.category = vehicleData.category;
    vehicle.status = vehicleData.status;
    vehicle.classDueDate = vehicleData.classDueDate;
    vehicle.currentClass = vehicleData.currentClass;
    vehicle.ododmeterReading = vehicleData.ododmeterReading;
    vehicle.pendingMaintainence = vehicleData.pendingMaintainence;
    vehicle.sparePartRequested = vehicleData.sparePartRequested;
    try {
      await this.vehicleRepository.save(vehicle);
      return vehicle;
    } catch (err) {
      console.log('Error occured while adding vehicle', err);
      throw err;
    }
  }
}
