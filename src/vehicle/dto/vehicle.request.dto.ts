export class AddVehicleRequestDto {
  vehicleNumber: string;
  category: string;
  ododmeterReading: number;
  currentClass: number;
  classDueDate: Date;
  pendingMaintainence: boolean;
  sparePartRequested: string;
  status: string;
}
