import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicles1737879206987 implements MigrationInterface {
    name = 'Vehicles1737879206987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "vehicleNumber"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "ododmeterReading"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "assignedDriver"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "currentClass"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "classDueDate"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "pendingMaintainence"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "sparePartRequested"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP COLUMN "assignmentDate"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "vehicle_number" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "ododmeter_reading" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "assigned_driver" text`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "current_class" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "class_due_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "pending_maintainence" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "spare_part_requested" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD "assignment_date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD "is_active" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "assigned_vehicle" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "assigned_vehicle"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP COLUMN "assignment_date"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "spare_part_requested"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "pending_maintainence"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "class_due_date"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "current_class"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "assigned_driver"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "ododmeter_reading"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "vehicle_number"`);
        await queryRunner.query(`ALTER TABLE "auth" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD "isActive" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD "assignmentDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "sparePartRequested" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "pendingMaintainence" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "classDueDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "currentClass" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "assignedDriver" text`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "ododmeterReading" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "vehicleNumber" text NOT NULL`);
    }

}
