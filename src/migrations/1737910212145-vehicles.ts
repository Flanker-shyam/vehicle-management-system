import { MigrationInterface, QueryRunner } from "typeorm";

export class Vehicles1737910212145 implements MigrationInterface {
    name = 'Vehicles1737910212145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "assigned_driver"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "assigned_driver" integer`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "assigned_vehicle"`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "assigned_vehicle" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "assigned_vehicle"`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "assigned_vehicle" text`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "assigned_driver"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "assigned_driver" text`);
    }

}
