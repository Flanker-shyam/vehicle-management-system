import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VehicleEntity } from './vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddVehicleRequestDto } from './dto/vehicle.request.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async getAllVehicles(): Promise<VehicleEntity[] | any> {
    try {
      const vehicles = await this.vehicleRepository.find();
      return vehicles;
    } catch (err) {
      console.log('Error occured while fetching all vehicles', err);
      throw err;
    }
  }
  async addVehicle(vehicleData: AddVehicleRequestDto) {
    const vehicleEntity = new VehicleEntity();
    vehicleEntity.vehicleNumber = vehicleData.vehicleNumber;
    vehicleEntity.category = vehicleData.category;
    vehicleEntity.status = vehicleData.status;
    vehicleEntity.classDueDate = vehicleData.classDueDate;
    vehicleEntity.currentClass = vehicleData.currentClass;
    vehicleEntity.ododmeterReading = vehicleData.ododmeterReading;
    vehicleEntity.pendingMaintainence = vehicleData.pendingMaintainence;
    vehicleEntity.sparePartRequested = vehicleData.sparePartRequested;
    try {
      await this.vehicleRepository.save(vehicleEntity);
      return vehicleEntity;
    } catch (err) {
      console.log('Error occured while adding vehicle', err);
      throw err;
    }
  }
}
