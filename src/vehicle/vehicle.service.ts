import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vehicles } from './vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddVehicleRequestDto,
  UpdateVehicleRequestDto,
} from './dto/vehicle.request.dto';
import { getVehicleResponseDto } from './dto/vehicle.response.dto';
import { findUpperBound } from './vehicle.util';

@Injectable()
export class VehicleService {
  private readonly ododMeterLimits = [
    100, 300, 1000, 2000, 3500, 5000, 8000, 12000, 15000, 100000,
  ];
  constructor(
    @InjectRepository(Vehicles)
    private vehicleRepository: Repository<Vehicles>,
  ) {}

  async getAllVehicles(
    category?: string,
    currentClass?: number,
    sparePartRequested?: string,
    assigned?: string,
  ): Promise<Vehicles[] | any> {
    try {
      const query = this.vehicleRepository.createQueryBuilder('vehicles');

      if (category) {
        query.andWhere('vehicles.category = :category', { category });
      }

      if (currentClass) {
        query.andWhere('vehicles.current_class = :currentClass', {
          currentClass,
        });
      }

      if (sparePartRequested) {
        query.andWhere(
          ':sparePartRequested = ANY (vehicles.spare_part_requested)',
          {
            sparePartRequested,
          },
        );
      }

      if (assigned) {
        if (assigned === 'unassigned') {
          query.andWhere('vehicles.assigned_driver IS NULL');
        } else if (assigned === 'assigned') {
          query.andWhere('vehicles.assigned_driver IS NOT NULL');
        }
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
  async addVehicle(
    vehicleData: AddVehicleRequestDto,
  ): Promise<getVehicleResponseDto> {
    const vehicle = new Vehicles();
    vehicle.vehicle_number = vehicleData.vehicleNumber;
    vehicle.category = vehicleData.category;
    vehicle.comments = vehicleData.comments;
    vehicle.class_due_date = new Date(vehicleData.classDueDate);
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

  async getVehicleById(id: number): Promise<getVehicleResponseDto> {
    try {
      const vehicle = await this.vehicleRepository.findOne({ where: { id } });
      if (!vehicle) {
        throw new NotFoundException('Vehicle not found');
      }
      return vehicle;
    } catch (err) {
      console.log('Error occurred while fetching vehicle by id', err);
      throw err;
    }
  }

  async updateVehicleDetails(
    id: number,
    vehicleData: UpdateVehicleRequestDto,
  ): Promise<getVehicleResponseDto> {
    try {
      const vehicle = await this.vehicleRepository.findOne({
        where: { id: id },
      });
      if (!vehicle) {
        throw new NotFoundException('Vehicle not found');
      }
      if ('pendingMaintainence' in vehicleData) {
        vehicle.pending_maintainence = vehicleData.pendingMaintainence;
      }
      if (vehicleData.comments) {
        vehicle.comments = vehicleData.comments;
      }
      if (vehicleData.currentClass) {
        vehicle.current_class = vehicleData.currentClass;
      }
      if (vehicleData.ododmeterReading) {
        const oldReadingLimit = findUpperBound(
          this.ododMeterLimits,
          vehicle.ododmeter_reading,
        );
        const newReadingLimit = findUpperBound(
          this.ododMeterLimits,
          vehicleData.ododmeterReading,
        );
        if (
          oldReadingLimit < newReadingLimit ||
          this.ododMeterLimits.includes(vehicleData.ododmeterReading)
        ) {
          vehicle.pending_maintainence = true;
        }
        vehicle.ododmeter_reading = vehicleData.ododmeterReading;
      }
      if (vehicleData.sparePartRequested) {
        vehicle.spare_part_requested = vehicleData.sparePartRequested;
      }
      if (vehicleData.classDueDate) {
        const currentDate = new Date();
        const dueDate = new Date(vehicleData.classDueDate);
        if (dueDate <= currentDate) {
          throw new BadRequestException('due date cannot be before today');
        }
        vehicle.class_due_date = new Date(vehicleData.classDueDate);
        vehicle.pending_maintainence = false;
      }
      await this.vehicleRepository.save(vehicle);
      return vehicle;
    } catch (err) {
      throw err;
    }
  }
}
