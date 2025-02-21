import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drivers } from '../drivers/drivers.entity';
import { VehicleAssignment } from '../vehicleAssignment/vehicleToDriverAssignment.entity';
import { Vehicles } from '../vehicle/vehicle.entity';

@Injectable()
export class AssignmentSeedService {
  constructor(
    @InjectRepository(VehicleAssignment)
    private readonly vehicleAssignmentRepository: Repository<VehicleAssignment>,
    @InjectRepository(Vehicles)
    private readonly vehiclesRepository: Repository<Vehicles>,
    @InjectRepository(Drivers)
    private readonly driverRepository: Repository<Drivers>,
  ) {}

  async insertvehicleAssignments() {
    console.log('Seeding Vehicle Assignments Tables...');
    const vehicles = await this.vehiclesRepository.find();
    const drivers = await this.driverRepository.find();

    if (vehicles.length === 0 || drivers.length === 0) {
      return;
    }
    const vehicleAssignment1 = new VehicleAssignment();
    vehicleAssignment1.driver = drivers[0];
    vehicleAssignment1.vehicle = vehicles[0];
    vehicleAssignment1.assignment_date = new Date('02-01-2024');
    vehicleAssignment1.is_active = false;

    const vehicleAssignment2 = new VehicleAssignment();
    vehicleAssignment2.driver = drivers[0];
    vehicleAssignment2.vehicle = vehicles[0];
    vehicleAssignment2.assignment_date = new Date('04-02-2024');
    vehicleAssignment2.is_active = true;
    drivers[0].assigned_vehicle = vehicles[0].vehicle_number;
    vehicles[0].assigned_driver = drivers[0].service_number;

    await Promise.all([
      this.vehicleAssignmentRepository.save(vehicleAssignment1),
      this.vehicleAssignmentRepository.save(vehicleAssignment2),
      this.vehiclesRepository.save(vehicles[0]),
      this.driverRepository.save(drivers[0]),
    ]);
  }
}
