import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleAssignment } from './vehicleToDriverAssignment.entitty';
import { Vehicles } from '../vehicle/vehicle.entity';
import { Drivers } from '../drivers/drivers.entity';
import { VehicleAssignmentRequestDto } from './dto/vehicleAssignment.request.dto';

@Injectable()
export class VehicleAssignmentService {
  constructor(
    @InjectRepository(VehicleAssignment)
    private vehicleAssignmentRepository: Repository<VehicleAssignment>,
    @InjectRepository(Vehicles)
    private vehiclesRepository: Repository<Vehicles>,
    @InjectRepository(Drivers)
    private driversRepository: Repository<Drivers>,
  ) {}

  async assignVehicleToDriver(
    assignmentData: VehicleAssignmentRequestDto,
  ): Promise<number> {
    const vehicleAssignment = new VehicleAssignment();
    const vehicle = await this.vehiclesRepository.findOne({
      where: { id: Number(assignmentData.vehicleId) },
    });
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    vehicleAssignment.vehicle = vehicle;

    const driver = await this.driversRepository.findOne({
      where: { id: Number(assignmentData.driverId) },
    });
    if (!driver) {
      throw new Error('Driver not found');
    }
    vehicleAssignment.driver = driver;
    vehicleAssignment.is_active = assignmentData.isActive;
    try {
      await this.vehicleAssignmentRepository.save(vehicleAssignment);
      return vehicleAssignment.id;
    } catch (err) {
      console.log('Error occured while assigning vehicle', err);
      throw err;
    }
  }

  async getAllAssignments(): Promise<VehicleAssignment[] | any> {
    try {
      const assignments = await this.vehicleAssignmentRepository.find();
      return assignments;
    } catch (err) {
      console.log('Error occured while fetching all assignments', err);
      throw err;
    }
  }
}
