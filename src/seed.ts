import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { VehicleSeedService } from './seed/vehicle.seed.service';
import { DriverSeedService } from './seed/driver.seed.service';
import { AssignmentSeedService } from './seed/assignment.seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const vehicleSeederService = app.get(VehicleSeedService);
  const driverSeederService = app.get(DriverSeedService);
  const assignmentSeederService = app.get(AssignmentSeedService);

  console.log('Running seedings...');
  try {
    await vehicleSeederService.insertVehicles();
    await driverSeederService.insertDrivers();
    // Adding a wait before assignment seed
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await assignmentSeederService.insertvehicleAssignments();
  } catch (err) {
    console.log(`Error Occured: ${err.message}`);
    throw err;
  }
  await app.close();
}

bootstrap();
