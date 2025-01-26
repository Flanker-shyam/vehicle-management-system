import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleAssignment } from './vehicleToDriverAssignment.entitty';
import { Vehicles } from '../vehicle/vehicle.entity';
import { Drivers } from '../drivers/drivers.entity';
import { VehicleAssignmentRequestDto } from './dto/vehicleAssignment.request.dto';
import { connectionSource } from '../config/typeorm';

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
    const queryRunner = connectionSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const vehicleAssignment = new VehicleAssignment();

      const vehicle = await queryRunner.manager.findOne(Vehicles, {
        where: { id: Number(assignmentData.vehicleId) },
      });
      if (!vehicle) {
        throw new NotFoundException('Vehicle not found');
      }
      vehicleAssignment.vehicle = vehicle;

      const driver = await queryRunner.manager.findOne(Drivers, {
        where: { id: Number(assignmentData.driverId) },
      });
      if (!driver) {
        throw new NotFoundException('Driver not found');
      }

      const assignment = await queryRunner.manager.findOne(VehicleAssignment, {
        where: {
          vehicle: { id: vehicle.id },
          driver: { id: driver.id },
        },
      });
      if (assignment && assignment.is_active) {
        throw new ConflictException('Vehicle is Already assigned and active');
      }
      vehicleAssignment.driver = driver;

      vehicleAssignment.is_active = assignmentData.isActive;
      await queryRunner.manager.save(vehicleAssignment);

      vehicle.assigned_driver = assignmentData.driverId;
      driver.assigned_vehicle = assignmentData.vehicleId;

      await Promise.all([
        queryRunner.manager.save(vehicle),
        queryRunner.manager.save(driver),
      ]);
      await queryRunner.commitTransaction();
      return vehicleAssignment.id;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log('Error occured while assigning vehicle', err.message);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getAllAssignments(): Promise<VehicleAssignment[] | any> {
    try {
      const assignments = await this.vehicleAssignmentRepository.find();
      return assignments;
    } catch (err) {
      console.log('Error occured while fetching all assignments', err);
      throw new InternalServerErrorException(
        `Internal server error: ${err.message}`,
      );
    }
  }

  async submitVehicle(assignmentId: number): Promise<number> {
    const queryRunner = connectionSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const assignment = await this.vehicleAssignmentRepository.findOne({
        where: { id: assignmentId },
      });
      if (!assignment) {
        throw new NotFoundException(`Assignment not found!`);
      } else {
        if (!assignment.is_active) {
          throw new NotFoundException(`Assignment is not active`);
        } else {
          const vehicle = await queryRunner.manager.findOne(Vehicles, {
            where: { id: assignment.vehicle.id },
          });
          const driver = await queryRunner.manager.findOne(Drivers, {
            where: { id: assignment.driver.id },
          });

          assignment.is_active = false;
          vehicle.assigned_driver = null;
          driver.assigned_vehicle = null;
          await Promise.all([
            queryRunner.manager.save(assignment),
            queryRunner.manager.save(vehicle),
            queryRunner.manager.save(driver),
          ]);
          await queryRunner.commitTransaction();
          return assignmentId;
        }
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
