import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleRequest } from './vehicleRequest.entity';
import { Repository } from 'typeorm';
import { VehicleRequestDto } from './vehicleRequest.dto';
import { Vehicles } from 'src/vehicle/vehicle.entity';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class VehicleRequestService {
  constructor(
    @InjectRepository(VehicleRequest)
    private vehicleRequestRepository: Repository<VehicleRequest>,
    @InjectRepository(Vehicles)
    private vehicleRepository: Repository<Vehicles>,
    private readonly mailerService: MailerService,
  ) {}

  async createRequest(data: VehicleRequestDto): Promise<VehicleRequest> {
    try {
      const request = new VehicleRequest();
      request.Gypsy = data.Gypsy;
      request.ALS = data.ALS;
      request.Dozer = data.Dozer;
      request.two_s_ton = data['2-s ton'];
      request.Plant = data.Plant;
      request.Misc = data.Misc;
      request.requested_date = data.requestedDate;
      request.comments = data.comments;
      request.email_of_user = data.email_of_user;

      return await this.vehicleRequestRepository.save(request);
    } catch (err) {
      throw err;
    }
  }

  async getAllRequests(): Promise<VehicleRequest[]> {
    try {
      const requests = await this.vehicleRequestRepository.find();
      return requests.sort((a, b) => {
        if (a.status === b.status) {
          return (
            new Date(a.requested_date).getTime() -
            new Date(b.requested_date).getTime()
          );
        }
        return a.status === 'open' ? -1 : 1;
      });
    } catch (err) {
      throw err;
    }
  }

  async updateRequestStatus(
    id: number,
    is_approved: boolean,
    comments: string,
  ): Promise<VehicleRequest> {
    try {
      const request = await this.vehicleRequestRepository.findOneBy({ id });
      request.is_approved = is_approved;
      request.status = 'closed';
      request.comments = comments;

      if (is_approved) {
        await this.mailerService.sendMail(
          request.email_of_user,
          'Request Approved!',
          `Your request has been approved: ${comments}`,
        );
      } else {
        await this.mailerService.sendMail(
          request.email_of_user,
          'Request Declined!',
          `Your request has been declined: ${comments}`,
        );
      }
      return await this.vehicleRequestRepository.save(request);
    } catch (err) {
      throw err;
    }
  }

  async getAllVehiclesByCategory(): Promise<{ [category: string]: string[] }> {
    try {
      const vehicles = await this.vehicleRepository.find({
        where: { assigned_driver: null },
      });

      const vehiclesByCategory: { [category: string]: string[] } = {};

      vehicles.forEach((vehicle) => {
        const category = vehicle.category;
        if (!vehiclesByCategory[category]) {
          vehiclesByCategory[category] = [];
        }
        vehiclesByCategory[category].push(vehicle.vehicle_number);
      });

      return vehiclesByCategory;
    } catch (err) {
      throw err;
    }
  }
}
