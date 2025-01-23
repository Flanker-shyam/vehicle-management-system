import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1737656633729 implements MigrationInterface {
  name = 'Migrations1737656633729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicle_entity" ("id" SERIAL NOT NULL, "vehicleNumber" text NOT NULL, "category" text NOT NULL, "ododmeterReading" double precision NOT NULL, "assignedDriver" text, "currentClass" text NOT NULL, "classDueDate" TIMESTAMP NOT NULL, "pendingMaintainence" boolean NOT NULL, "sparePartRequested" text NOT NULL, "status" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_901cac34c94a50c311650bc5ad5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "driver_vehicle_assignment_entity" ("id" SERIAL NOT NULL, "assignmentDate" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "driver_id" integer, "vehicle_id" integer, CONSTRAINT "PK_6dbad4a4fbcaa54562655a6c301" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "drivers_entity" ("id" SERIAL NOT NULL, "service_number" text NOT NULL, "rank" text NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "phone_number" character varying(10) NOT NULL, "unit" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2eea85124b5e55fad3b5cf31467" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "driver_vehicle_assignment_entity" ADD CONSTRAINT "FK_41e89857b050d09dd3357d8839f" FOREIGN KEY ("driver_id") REFERENCES "drivers_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "driver_vehicle_assignment_entity" ADD CONSTRAINT "FK_d2f1f76abd62b94c313abc46d9c" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "driver_vehicle_assignment_entity" DROP CONSTRAINT "FK_d2f1f76abd62b94c313abc46d9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "driver_vehicle_assignment_entity" DROP CONSTRAINT "FK_41e89857b050d09dd3357d8839f"`,
    );
    await queryRunner.query(`DROP TABLE "drivers_entity"`);
    await queryRunner.query(`DROP TABLE "driver_vehicle_assignment_entity"`);
    await queryRunner.query(`DROP TABLE "vehicle_entity"`);
  }
}
