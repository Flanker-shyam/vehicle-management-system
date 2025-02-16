import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1739710930891 implements MigrationInterface {
    name = 'Migrations1739710930891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "vehicle_number" text NOT NULL, "category" text NOT NULL, "ododmeter_reading" double precision NOT NULL, "assigned_driver" text, "current_class" text NOT NULL, "class_due_date" TIMESTAMP NOT NULL, "pending_maintainence" boolean NOT NULL, "spare_part_requested" text array NOT NULL, "comments" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_assignment" ("id" SERIAL NOT NULL, "assignment_date" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "driver_id" integer, "vehicle_id" integer, CONSTRAINT "PK_67e752beaab2a3b5a0af8d482bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drivers" ("id" SERIAL NOT NULL, "service_number" text NOT NULL, "rank" text NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "phone_number" character varying(10) NOT NULL, "unit" text NOT NULL, "assigned_vehicle" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_366ebf23d8f3781bb7bb37abbd1" UNIQUE ("username"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicle_request" ("id" SERIAL NOT NULL, "Gypsy" integer NOT NULL, "ALS" integer NOT NULL, "Dozer" integer NOT NULL, "two_s_ton" integer NOT NULL, "Plant" integer NOT NULL, "Misc" integer NOT NULL, "status" text NOT NULL DEFAULT 'open', "is_approved" boolean, "comments" text NOT NULL, "email_of_user" text NOT NULL, "requested_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9cd72268a2b69eba1c573d6b97c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD CONSTRAINT "FK_8ab1c47ff733d5545fe855992b1" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" ADD CONSTRAINT "FK_218c66217fa7023f17a6d2b2925" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP CONSTRAINT "FK_218c66217fa7023f17a6d2b2925"`);
        await queryRunner.query(`ALTER TABLE "vehicle_assignment" DROP CONSTRAINT "FK_8ab1c47ff733d5545fe855992b1"`);
        await queryRunner.query(`DROP TABLE "vehicle_request"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "drivers"`);
        await queryRunner.query(`DROP TABLE "vehicle_assignment"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
