import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { VehicleModule } from './vehicle/vehicle.module';
import { DriversModule } from './drivers/drivers.module';
import { VehicleAssignmentModule } from './vehicleAssignment/vehicleAssignment.module';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [
    AuthModule,
    VehicleModule,
    DriversModule,
    VehicleAssignmentModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
