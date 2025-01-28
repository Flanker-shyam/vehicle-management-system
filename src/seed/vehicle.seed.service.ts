import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicles } from '../vehicle/vehicle.entity';
import { Repository } from 'typeorm';
import { AddVehicleRequestDto } from '../vehicle/dto/vehicle.request.dto';

@Injectable()
export class VehicleSeedService {
  constructor(
    @InjectRepository(Vehicles)
    private readonly vehicleRepository: Repository<Vehicles>,
  ) {}

  async insertVehicles() {
    console.log('check if data already exist');
    const vehicleItem = this.vehicleRepository.findOne({
      where: { vehicle_number: 'SX-123' },
    });
    if (vehicleItem) {
      throw new Error('Seeding is already done');
    }
    console.log('Seeding Vehicles Tables...');
    const vehicles: AddVehicleRequestDto[] = [
      {
        vehicleNumber: 'SX-123',
        category: 'Jeep',
        ododmeterReading: 1245,
        assignedDriver: '2',
        currentClass: 1,
        classDueDate: new Date('2024-02-03'),
        pendingMaintainence: false,
        sparePartRequested: ['oil'],
        comments: 'string',
      },
      {
        vehicleNumber: 'HX-123',
        category: 'Truck',
        ododmeterReading: 1245,
        assignedDriver: '2',
        currentClass: 1,
        classDueDate: new Date('2024-02-03'),
        pendingMaintainence: false,
        sparePartRequested: ['oil', 'tires'],
        comments: 'string',
      },
      {
        vehicleNumber: 'GC-123',
        category: 'Truck',
        ododmeterReading: 1245,
        assignedDriver: '1',
        currentClass: 1,
        classDueDate: new Date('2024-02-03'),
        pendingMaintainence: false,
        sparePartRequested: ['misc'],
        comments: 'string',
      },
      {
        vehicleNumber: 'IDK-322',
        category: 'Safari',
        ododmeterReading: 115,
        assignedDriver: null,
        currentClass: 3,
        classDueDate: new Date('2024-02-03'),
        pendingMaintainence: false,
        sparePartRequested: ['misc', 'engine'],
        comments: 'this is also dummy',
      },
    ];

    for (const item of vehicles) {
      const vehicle = new Vehicles();
      vehicle.vehicle_number = item.vehicleNumber;
      vehicle.category = item.category;
      vehicle.comments = item.comments;
      vehicle.class_due_date = new Date(item.classDueDate);
      vehicle.current_class = item.currentClass;
      vehicle.ododmeter_reading = item.ododmeterReading;
      vehicle.pending_maintainence = item.pendingMaintainence;
      vehicle.spare_part_requested = item.sparePartRequested;

      await this.vehicleRepository.save(vehicle);
    }
  }
}
