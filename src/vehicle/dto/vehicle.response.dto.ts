export class getVehicleResponseDto {
  id: number;
  vehicleNumber: string;
  category: string;
  ododmeterReading: number;
  assignedDriver: string | null;
  currentClass: number;
  classDueDate: Date;
  pendingMaintainence: boolean;
  sparePartRequested: string;
  status: string;
  createdAt: Date;
}
