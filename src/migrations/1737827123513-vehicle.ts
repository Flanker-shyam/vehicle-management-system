import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicle1737827123513 implements MigrationInterface {
    name = 'Vehicle1737827123513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "vehicleNumber" text NOT NULL, "category" text NOT NULL, "ododmeterReading" double precision NOT NULL, "assignedDriver" text, "currentClass" text NOT NULL, "classDueDate" TIMESTAMP NOT NULL, "pendingMaintainence" boolean NOT NULL, "sparePartRequested" text NOT NULL, "status" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_assignment" ("id" SERIAL NOT NULL, "assignmentDate" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "driver_id" integer, "vehicle_id" integer, CONSTRAINT "PK_67e752beaab2a3b5a0af8d482bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drivers" ("id" SERIAL NOT NULL, "service_number" text NOT NULL, "rank" text NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "phone_number" character varying(10) NOT NULL, "unit" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_366ebf23d8f3781bb7bb37abbd1" UNIQUE ("username"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD CONSTRAINT "FK_8ab1c47ff733d5545fe855992b1" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD CONSTRAINT "FK_218c66217fa7023f17a6d2b2925" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP CONSTRAINT "FK_218c66217fa7023f17a6d2b2925"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP CONSTRAINT "FK_8ab1c47ff733d5545fe855992b1"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
        await queryRunner.query(`DROP TABLE "vehicle_assignment"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
